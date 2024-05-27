import { Schema, model } from "mongoose";

const collection = "categories";
const schema = new Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    photo: {
      type: String,
      default:
        "https://galletasavena.com/wp-content/uploads/2018/08/6.-galletas-de-avena-y-pasas.jpg",
    },
  },
  {
    timestamps: true,
  }
);
const Category = model(collection, schema);
export default Category;