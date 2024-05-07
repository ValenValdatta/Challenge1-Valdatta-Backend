import { Router } from "express";
import cartsManager from "../../data/mongo/CartsManager.mongo.js";

const cartsRouter = Router();

cartsRouter.post("/", create);
cartsRouter.get("/", read);
cartsRouter.put("/:cid", update);
cartsRouter.delete("/:cid", destroy);

async function create(req, res, next) {
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
}

async function read(req, res, next) {
   try {
      const { user_id } = req.query;
      const all = await cartsManager.read(user_id);
      if (all.length > 0) {
         return res.json({
            statusCode: 200,
            message: "READ",
            response: all,
         });
      } else {
         const error = new Error("NOT FOUND");
         error.statusCode = 404;
         throw error;
      }
   } catch (error) {
      throw next(error);
   }
}
async function update(req, res, next) {
   try {
      const { cid } = req.params;
      const data = req.body;
      const one = await cartsManager.update(cid, data);
      return res.json({
         statusCode: 200,
         message: "CART UPDATED: " + one.id,
         response: one,
      });
   } catch (error) {
      return next(error);
   }
}

async function destroy(req, res, next) {
   try {
      const { cid } = req.params;
      const one = await cartsManager.destroy(cid);
      return res.json({
         statusCode: 200,
         response: one,
      });
   } catch (error) {
      return next(error);
   }
}
export default cartsRouter;
