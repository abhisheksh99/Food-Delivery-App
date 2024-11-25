import mongoose from "mongoose";

const resturantSchema = new mongoose.Schema({

},{
    timestamps:true
})

const Resturant = mongoose.model("Resturant",resturantSchema)

export default Resturant