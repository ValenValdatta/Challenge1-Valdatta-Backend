import { Schema, Types, model } from "mongoose";

const collection = "products";

const schema = new Schema(
   {
      title: { type: String, required: true }, //por defecto los campos no son obligatorios
      category: { type: String, index: true },
      photo: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCBexfj_xSBiEe5xII-WRM2uDdhGUy79htnNz5g-lJhQ&s" },
      price: { type: Number },
      stock: { type: Number },
      user_id: { type: Types.ObjectId, ref: "users", index: true, required: true }
   },
   {
      timestamps: true,
   }
);

schema.pre("find", function () { 
   this.populate("user_id", "email photo -_id"); 
})
schema.pre("findOne", function () { 
   this.populate("user_id", "email");
})

const Product = model(collection, schema);
export default Product;
