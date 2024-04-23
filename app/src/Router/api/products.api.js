import { Router } from "express";
// import productManager from "../../data/fs/productManager.js";
import productsManager from "../../data/mongo/ProductsManager.mongo.js";
import isText from "../../middlewares/isText.mid.js";

const productsRouter = Router();

productsRouter.get("/", read)
productsRouter.get("/:pid", readOne)
productsRouter.post("/", isText, create);
productsRouter.put("/:pid", update);
productsRouter.delete("/:pid", destroy);


async function read (req, res, next) {
    try {
       const { category } = req.query;
       const all = await productsManager.read(category);
       if (all.length > 0) {
          return res.json ({
            statusCode: 200,
            response: all,
          })
       } else {
          const error = new Error("NOT FOUND");
          error.statusCode = 404;
          throw error;
       }
    } catch (error) {
        return next(error)
    }
 }

async function readOne (req, res, next) {
    try {
       const { pid } = req.params;
       const one = await productsManager.readOne(pid);
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
        return next(error)
    }
 }

async function create(req, res, next) {
   try {
      const data = req.body;
      const one = await productsManager.create(data);
      return res.json({
         statusCode: 201,
         message: "CREATED PRODUCT: " + one.id,
      });
   } catch (error) {
    return next(error)
   }
}

async function update(req, res, next) {
   try {
      const { pid } = req.params;
      const data = req.body;
      const one = await productsManager.update(pid, data);
      return res.json({
         statusCode: 200,
         message: "PRODUCT UPDATED: " + one.id,
         response: one,
      });
   } catch (error) {
    return next(error)
   }
}

async function destroy(req, res, next) {
   try {
      const { pid } = req.params;
      const one = await productsManager.destroy(pid);
      return res.json({
         statusCode: 200,
         response: one,
      });
   } catch (error) {
      return next(error)
   }
}

export default productsRouter;
