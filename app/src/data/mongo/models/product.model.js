import { Schema, model } from "mongoose";

const collection = "products";

const schema = new Schema(
   {
      title: { type: String, required: true }, //por defecto los campos no son obligatorios
      category: { type: String },
      photo: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCBexfj_xSBiEe5xII-WRM2uDdhGUy79htnNz5g-lJhQ&s" },
      price: { type: Number },
      stock: { type: Number },
   },
   {
      timestamps: true,
   }
);

const Product = model(collection, schema);

export default Product;
