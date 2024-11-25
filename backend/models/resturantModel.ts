import mongoose, { Document } from "mongoose";

interface IResturant extends Document {
  user: mongoose.Schema.Types.ObjectId;
  resturantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  imageUrl: string;
  menus: mongoose.Schema.Types.ObjectId;
}

const resturantSchema = new mongoose.Schema<IResturant>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resturantName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    cuisines: {
      type: [String],
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    menus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
    },
  },
  {
    timestamps: true,
  }
);

const Resturant = mongoose.model<IResturant>("Resturant", resturantSchema);

export default Resturant;
