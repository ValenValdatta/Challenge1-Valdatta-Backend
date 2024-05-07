import { Router } from "express";
import cartsManager from "../../data/mongo/CartsManager.mongo.js";

const cartsRouter = Router();

cartsRouter.post("/", async (req, res, next) => {
   try {
      const data = req.body;
      const one = await cartsManager.create(data);
      return res.json({
         statusCode: 201,
         message: "CREATED",
         response: one,
      });
   } catch (error) {
      throw next(error);
   }
});

cartsRouter.get("/", async (req, res, next) => {
   try {
      const { user_id } = req.query;
      if (user_id) {
         const all = await cartsManager.read({ user_id });
         if (all.length > 0) {
            return res.json({
               statusCode: 200,
               message: "READ",
               response: all,
            });
         }
      }
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
   } catch (error) {
      throw next(error);
   }
});

export default cartsRouter;
