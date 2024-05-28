   import CustomRouter from "../CustomRouter.js";
// import productManager from "../../data/fs/productManager.js";
import productsManager from "../../data/mongo/ProductsManager.mongo.js";
import isText from "../../middlewares/isText.mid.js";
import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";

class ProductsRouter extends CustomRouter {
   init() {
      this.read("/", ["PUBLIC"], read)
      this.read("/paginate", ["PUBLIC"], paginate)
      this.read("/:pid",["PUBLIC"], readOne)
      this.create("/", ["ADMIN"], isValidAdmin, isText, create);
      this.update("/:pid", ["ADMIN"], update);
      this.destroy("/:pid", ["ADMIN"], destroy);
   }
}

const productsRouter = new ProductsRouter()
export default productsRouter.getRouter();


async function read (req, res, next) {
    try {
       const { category } = req.query;
       const all = await productsManager.read(category);
       if (all.length > 0) {
         //  return res.json ({
         //    statusCode: 200,
         //    response: all,
         //  })
         return res.response200(all)  //esto lo hice con las respuestas default del custom router
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
         //  return res.status(200).json({
         //     response: one,
         //     success: true,
         //  });
         return res.response200(one)
       } else {
          const error = new Error("NOT FOUND");
          error.statusCode = 404;
          throw error;
       }
    } catch (error) {
        return next(error)
    }
 }

async function paginate (req, res, next) {
   try {
      const filter = {}
      const opts = {}
      if(req.query.limit) {
         opts.limit = req.query.limit
      }
      if(req.query.page) {
         opts.page = req.query.page
      }
      if(req.query.user_id) {
         filter.user_id = req.query.user_id
      }
      const all = await productsManager.paginate({ filter, opts })
      // return res.json({
      //    statusCode: 200,
      //    response: all.docs,
      //    info: 
      // })
      const info = {
         totalDocs: all.totalDocs,
         page: all.page,
         totalPages: all.totalPages,
         limit: all.limit,
         prevPage: all.prevPage,
         nextPage: all.nextPage
      } 
      return res.paginate(all.docs, info)
   } catch (error) {
      return next(error)
   }
}

async function create(req, res, next) {
   try {
      const data = req.body;
      const one = await productsManager.create(data);
      // return res.json({
      //    statusCode: 201,
      //    message: "CREATED PRODUCT: " + one.id,
      // });
      return res.response201("CREATED ID: " + one.id)
   } catch (error) {
    return next(error)
   }
}

async function update(req, res, next) {
   try {
      const { pid } = req.params;
      const data = req.body;
      const one = await productsManager.update(pid, data);
      // return res.json({
      //    statusCode: 200,
      //    message: "PRODUCT UPDATED: " + one.id,
      //    response: one,
      // });
      return res.response200(one)
   } catch (error) {
    return next(error)
   }
}

async function destroy(req, res, next) {
   try {
      const { pid } = req.params;
      const one = await productsManager.destroy(pid);
      // return res.json({
      //    statusCode: 200,
      //    response: one,
      // });
      return res.response200(one)
   } catch (error) {
      return next(error)
   }
}

