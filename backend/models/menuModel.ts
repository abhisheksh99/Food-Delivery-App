import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({

},{
    timestamps:true
})

const Menu = mongoose.model("Menu",menuSchema)

export default Menu