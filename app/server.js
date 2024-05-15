import "dotenv/config.js";
import express from "express"; //IMPORTO EL MODULO DE EXPRESS
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import productManager from "./src/data/fs/ProductManager.js";
import userManager from "./src/data/fs/UserManager.js";
import indexRouter from "./src/Router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";
import socketCb from "./src/Router/index.socket.js";
import dbConnect from "./src/utils/dbConnect.js";

// console.log(process.env);

const server = express();
const port = process.env.PORT || 9000;
const ready = async () => {
   console.log("server ready on port" + port);
   await dbConnect();
};
const nodeServer = createServer(server);
//aca arriba cree un servidor de node con el metodo nativo createServer, con las configuraciones del servidor de express
nodeServer.listen(port, ready);

//creo un servidor de TCP, construyendo una instancia del servidor de socket, pasando como base el servidor de node (TCP esta basado en HTTP)
const socketServer = new Server(nodeServer);
socketServer.on("connection", socketCb);
export { socketServer };

//HANDLEBARS
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//MIDDLEWARES
server.use(
   session({
      store: new MongoStore({ mongoUrl: process.env.MONGO_URI, ttl: 60 * 60 }),
      secret: process.env.SECRET_SESSION,
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 60 * 60 * 1000 },
   })
);
server.use(cookieParser(process.env.SECRET));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
//OBLIGO a mi servidor que use la funcion de leer parametros/consultas (req.params/req.querys)

// RUTAS

server.get("/", async (requirements, response) => {
   try {
      return response.status(200).json({
         response: "CODER API",
         success: true,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         response: "CODER API ERROR",
         success: false,
      });
   }
});

//get con dos parametros

server.get("/api/products/:title/:category", async (req, res) => {
   try {
      const { title, category } = req.params;
      const data = { title, category };
      const one = await productManager.create(data);
      return res.status(201).json({
         response: one,
         success: true,
      });
   } catch (error) {
      console.log(error);
      return response.status(500).json({
         response: "CODER API ERROR",
         success: false,
      });
   }
});

// PETICIONES DE USERS

server.get("/api/users/:uid", async (req, res) => {
   try {
      const { uid } = req.params;
      const one = await userManager.readOne(uid);
      if (one) {
         return res.status(200).json({
            response: one,
            success: true,
         });
      } else {
         const error = new Error("NOT FOUND");
         error.statusCode = 404;
         throw error;
      }
   } catch (error) {
      console.log(error);
      return res.status(error.statusCode).json({
         response: error.message,
         success: false,
         message: "No se encontraron usuarios con ese ID",
      });
   }
});

server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
