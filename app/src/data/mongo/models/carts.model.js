import { Schema, Types, model } from "mongoose";

const collection = "carts";
const schema = new Schema(
   {
      user_id: { type: Types.ObjectId , ref: "users", required: true },
      clothe_id: { type: Types.ObjectId , ref: "clothes", required: true },
      quantity: { type: Number, required: true },
      state: {
         type: String,
         enum: ["reserved", "paid", "delivered"],
         default: "reserved",
      },
   },
   {
      timestamps: true,
   }
);

schema.pre("find", function () {
   this.populate("user_id", "email role");
});
schema.pre("find", function () {
   this.populate("clothe_id");
});

const Cart = model(collection, schema);
export default Cart;
