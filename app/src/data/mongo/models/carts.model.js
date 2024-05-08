import { Schema, Types, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


const collection = "carts";
const schema = new Schema(
   {
      user_id: { type: Types.ObjectId , ref: "users", required: true },
      product_id: { type: Types.ObjectId , ref: "products", required: true },
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

schema.plugin(mongoosePaginate);

schema.pre("find", function () {
   this.populate("user_id", "email role");
});
schema.pre("find", function () {
   this.populate("product_id", "title category");
});

const Cart = model(collection, schema);
export default Cart;
