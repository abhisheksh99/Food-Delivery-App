import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Order = () => {
  const orders = [
    {
      name: "Product 1",
      price: 50, 
      image: "https://via.placeholder.com/56",
    },
    {
      name: "Product 2",
      price: 70,
      image: "https://via.placeholder.com/56",
    },
    {
      name: "Product 3",
      price: 100, 
      image: "https://via.placeholder.com/56",
    },
  ];

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
          Order not found!
        </h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Order Status: <span className="text-[#FF5A5A]">CONFIRM</span>
          </h1>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Order Summary
          </h2>
          {/* Ordered Item Display */}
          {orders.map((order, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-14 h-14 rounded-md object-cover"
                  />
                  <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">
                    {order.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-gray-800 dark:text-gray-200 flex items-center">
                    $<span className="text-lg font-medium">{order.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
            </div>
          ))}
        </div>
        <Link to="/cart">
          <Button className="bg-orange hover:bg-hoverOrange w-full py-3 rounded-md shadow-lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Order;
