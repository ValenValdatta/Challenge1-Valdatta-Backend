import productManager from "../data/fs/ProductManager.js"
import userManager from "../data/fs/UserManager.js"


export default async (socket) => {
    console.log("product id: " +socket.id)
    socket.emit("products", await productManager.read())
    socket.on("create", async data => {
        await productManager.create(data)
        socket.emit("products", await productManager.read())
        
    } )

    socket.emit("users", await userManager.read())
    socket.on("register", async data => {
        await userManager.create(data)
        socket.emit("users", await userManager.read())
        
    } )
}