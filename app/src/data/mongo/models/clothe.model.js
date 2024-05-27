import { Schema, model, Types } from "mongoose";

const collection = "clothes";
const schema = new Schema(
  {
    name: { type: String, required: true, unique: true, index: true },
    category_id: {
      type: Types.ObjectId,
      ref: "categories",
      required: true,
      index: true,
    },
    size_id: {
      type: Types.ObjectId,
      ref: "sizes",
      required: true,
      index: true,
    },
    stock: { type: Number, required: true, default: 10 },
    photo: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png",
    },
  },
  {
    timestamps: true,
  }
);
const Clothe = model(collection, schema);
export default Clothe;