import argsUtil from "../utils/args.util.js";
import dbConnect from "../utils/dbConnect.js";

const persistence = argsUtil.persistence
let dao = {}


switch (persistence) {
    case "memory":
        console.log("conected to memory");
        const { default: usersManagerMem } = await import("./memory/User.js") 
        const { default: productsManagerMem } = await import ("./memory/Product.js")
        const { default: cartsManagerMem } = await import ("./memory/Carts.js")

        dao = { users: usersManagerMem, products: productsManagerMem, carts: cartsManagerMem }
        break;
    case "fs":
        console.log("conected to fs");
        const { default: usersManagerFs } = await import("./fs/UserManager.js") 
        const { default: productsManagerFs } = await import("./fs/ProductManager.js") 
        const { default: cartsManagerFs } = await import("./fs/CartManager.js") 

        dao = { users: usersManagerFs, products: productsManagerFs, carts: cartsManagerFs }
        break;
    default:
        console.log("conected to mongoDB");
        dbConnect()

        const { default: usersManagerMongo } = await import("./mongo/UsersManager.mongo.js") 
        const { default: productsManagerMongo } = await import("./mongo/ProductsManager.mongo.js") 
        const { default: cartsManagerMongo } = await import("./mongo/CartsManager.mongo.js") 

        dao = { users: usersManagerMongo, products: productsManagerMongo, carts: cartsManagerMongo }

        break;
}

export default dao