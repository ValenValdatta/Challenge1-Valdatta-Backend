// import productManager from "../data/fs/ProductManager.js"
// import userManager from "../data/fs/UserManager.js"
// import { socketServer } from "../../server.js"

// let messages = []

// export default async (socket) => {
//     console.log("product id: " +socket.id)
//     socket.emit("products", await productManager.read())
//     socket.on("create", async data => {
//         await productManager.create(data)
//         socket.emit("products", await productManager.read())
        
//     } )

//     socket.emit("users", await userManager.read())
//     socket.on("register", async data => {
//         await userManager.create(data)
//         socket.emit("users", await userManager.read())
        
//     } )

//     socket.on("nickname", async (nick) => {
//         messages.push(nick+" is now online ")
//         socketServer.emit("messages", messages)
//     });

//     socket.on("all messages", allMessages => {
//         messages = allMessages
//         socketServer.emit("messages", messages)
//     })
// }