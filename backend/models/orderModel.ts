import mongoose from "mongoose";

interface IOrder extends Document {

}

const orderSchema = new mongoose.Schema<IOrder>({

},{
    timestamps:true
})

const Order = mongoose.model<IOrder>("Order",orderSchema)

export default Order