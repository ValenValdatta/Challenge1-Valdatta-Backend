import { connect } from "mongoose";
import enviroment from "./env.util.js";

async function dbConnect(){
    try {
        await connect(enviroment.MONGO_URI)
        console.log("connected to mongo database");
    } catch (error) {
        console.log(error);
    }
}

export default dbConnect