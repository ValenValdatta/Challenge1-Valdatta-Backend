import Cart from "./models/carts.model.js";
import Manager from "./Manager.mongo.js";

const cartsManager = new Manager(Cart)
export default cartsManager