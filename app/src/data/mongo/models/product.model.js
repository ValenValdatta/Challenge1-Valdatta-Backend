import { Schema, Types, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "products";

const schema = new Schema(
   {
      title: { type: String, required: true }, //por defecto los campos no son obligatorios
      category: { type: String, index: true },
      photo: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCBexfj_xSBiEe5xII-WRM2uDdhGUy79htnNz5g-lJhQ&s" },
      price: { type: Number },
      stock: { type: Number },
   },
   {
      timestamps: true,
   }
);

schema.plugin(mongoosePaginate);


const Product = model(collection, schema);
export default Product;
