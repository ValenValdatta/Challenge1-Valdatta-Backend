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

        dao = { usersManager: usersManagerMem, productsManager: productsManagerMem, cartsManager: cartsManagerMem }
        break;
    case "fs":
        console.log("conected to fs");
        const { default: usersManagerFs } = await import("./fs/UserManager.js") 
        const { default: productsManagerFs } = await import("./fs/ProductManager.js") 
        const { default: cartsManagerFs } = await import("./fs/CartManager.js") 


        dao = { usersManager: usersManagerFs, productsManager: productsManagerFs, cartsManager: cartsManagerFs }
        break;
    default:
        console.log("conected to mongoDB");
        dbConnect()

        const { default: usersManagerMongo } = await import("./mongo/UsersManager.mongo.js") 
        const { default: productsManagerMongo } = await import("./mongo/ProductsManager.mongo.js") 
        const { default: cartsManagerMongo } = await import("./mongo/CartsManager.mongo.js") 
        

        dao = { usersManager: usersManagerMongo, productsManager: productsManagerMongo, cartsManager: cartsManagerMongo }

        break;
}

export default dao