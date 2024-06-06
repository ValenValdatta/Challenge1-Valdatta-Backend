import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "users";

const schema = new Schema(
   {
      email: { type: String, required: true, unique: true, index: true },
      photo: {
         type: String,
         default:
            "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
      },
      password: { type: String, required: true },
      age: { type: Number, default: 20 },
      role: { type: Number, default: 0, index: true },
   },
   {
      timestamps: true,
   }
);

schema.plugin(mongoosePaginate);


const User = model(collection, schema);
export default User;
