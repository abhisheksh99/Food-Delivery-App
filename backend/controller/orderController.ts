import { Request, Response } from "express";
import mongoose from "mongoose";
import Order from "../models/orderModel";
import Restaurant from "../models/restaurantModel";
import Stripe from "stripe";

// Initialize the Stripe instance with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Define the type for the checkout session request payload
type CheckoutSessionRequest = {
    cartItems: {
        menuId: string;
        name: string;
        image: string;
        price: number;
        quantity: number;
    }[];
    deliveryDetails: {
        name: string;
        email: string;
        address: string;
        city: string;
    };
    restaurantId: string;
};

// Define a type for Menu to represent the menu items
type Menu = {
    _id: mongoose.Types.ObjectId;
    name: string;
    image: string;
    price: number;
};

// Controller to fetch all orders for a user
export const getOrders = async (req: Request, res: Response) => {
    try {
        // Find orders associated with the logged-in user
        const orders = await Order.find({ user: req.id })
            .populate("user") // Populate user details
            .populate("restaurant"); // Populate restaurant details

        // Return the orders in the response
        return res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to create a checkout session
export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body;

        // Fetch the restaurant details and populate menus
        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId)
            .populate<{ menus: Menu[] }>("menus"); // Specify that menus will be populated with Menu objects

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found.",
            });
        }

        // Create a new order in the database
        const order: any = new Order({
            restaurant: restaurant._id,
            user: req.id,
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            status: "pending",
        });

        // Generate line items for the Stripe checkout session
        const lineItems = await createLineItems(checkoutSessionRequest, restaurant.menus);

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"], // Accept card payments
            shipping_address_collection: {
                allowed_countries: ["GB", "US", "CA"], // Restrict shipping to specific countries
            },
            line_items: lineItems, // Add line items for the session
            mode: "payment", // Set mode to payment
            success_url: `${process.env.FRONTEND_URL}/order/status`, // Redirect on success
            cancel_url: `${process.env.FRONTEND_URL}/cart`, // Redirect on cancellation
            metadata: {
                orderId: order._id.toString(),
                images: JSON.stringify(
                    restaurant.menus.map((menu: Menu) => menu.image) // Add image metadata
                ),
            },
        });

        if (!session.url) {
            return res.status(400).json({
                success: false,
                message: "Error while creating session",
            });
        }

        // Save the order in the database
        await order.save();

        // Return the session URL to the client
        return res.status(200).json({
            session,
        });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to handle Stripe webhook events
export const stripeWebhook = async (req: Request, res: Response) => {
    let event;

    try {
        const signature = req.headers["stripe-signature"];

        // Construct the payload string for verification
        const payloadString = JSON.stringify(req.body, null, 2);
        const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;

        // Generate and verify the event using the Stripe webhook secret
        event = stripe.webhooks.constructEvent(payloadString, signature as string, secret);
    } catch (error: any) {
        console.error("Webhook error:", error.message);
        return res.status(400).send(`Webhook error: ${error.message}`);
    }

    // Handle the checkout session completed event
    if (event.type === "checkout.session.completed") {
        try {
            const session = event.data.object as Stripe.Checkout.Session;

            // Find the order using metadata from the session
            const order = await Order.findById(session.metadata?.orderId);

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            // Update the order's status and total amount
            if (session.amount_total) {
                order.totalAmount = session.amount_total;
            }
            order.status = "confirmed";

            // Save the updated order
            await order.save();
        } catch (error) {
            console.error("Error handling event:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    // Send a 200 response to acknowledge receipt of the event
    res.status(200).send();
};

// Helper function to create line items for the Stripe checkout session
export const createLineItems = async (
    checkoutSessionRequest: CheckoutSessionRequest,
    menuItems: Menu[]
) => {
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        // Find the menu item corresponding to the cart item
        const menuItem = menuItems.find(
            (item) => item._id.toString() === cartItem.menuId
        );
        if (!menuItem) throw new Error(`Menu item id not found`);

        // Return the line item for the checkout session
        return {
            price_data: {
                currency: "usd", // Specify currency
                product_data: {
                    name: menuItem.name, // Menu item name
                    images: [menuItem.image], // Menu item image
                },
                unit_amount: menuItem.price * 100, // Convert price to cents
            },
            quantity: cartItem.quantity, // Quantity of the item
        };
    });

    return lineItems; // Return the array of line items
};
