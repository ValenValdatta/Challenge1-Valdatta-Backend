import { createService, readService, readOneService, updateService, destroyService } from "../services/carts.service.js"

async function create(req, res, next) {
   try {
      const data = req.body;
      data.user_id = req.user._id;
      const one = await createService(data);
      // return res.json({
      //    statusCode: 201,
      //    message: "CREATED",
      //    response: one,
      // });
      return res.response201(one);
   } catch (error) {
      throw next(error);
   }
}
async function read(req, res, next) {
   try {
      const user_id = req.user._id;
      const all = await readService({ user_id });
      if (all.length > 0) {
         return res.response200(all);
      } else {
         const error = new Error("Not found!");
         error.statusCode = 404;
         throw error;
      }
   } catch (error) {
      return next(error);
   }
}
async function readOne(req, res, next) {
   try {
      const { cid } = req.params;
      const one = await readOneService(cid);
      if (one) {
         // return res.status(200).json({
         //    response: one,
         //    success: true,
         // });
         return res.response200(one);
      } else {
         // const error = new Error("NOT FOUND");
         // error.statusCode = 404;
         // throw error;
         return res.error404();
      }
   } catch (error) {
      return next(error);
   }
}
async function paginate(req, res, next) {
   try {
      const filter = {};
      const opts = {};
      if (req.query.limit) {
         opts.limit = req.query.limit;
      }
      if (req.query.page) {
         opts.page = req.query.page;
      }
      if (req.query.user_id) {
         filter.user_id = req.query.user_id;
      }
      const all = await paginateService({ filter, opts });
      // return res.json({
      //    statusCode: 200,
      //    response: all.docs,
      //    info: {
      //       page: all.page,
      //       totalPages: all.totalPages,
      //       limit: all.limit,
      //       prevPage: all.prevPage,
      //       nextPage: all.nextPage,
      //    },
      // });
      const info = {
         totalDocs: all.totalDocs,
         page: all.page,
         totalPages: all.totalPages,
         limit: all.limit,
         prevPage: all.prevPage,
         nextPage: all.nextPage,
      };
      return res.paginate(all.docs, info);
   } catch (error) {
      return next(error);
   }
}
async function update(req, res, next) {
   try {
      const { cid } = req.params;
      const data = req.body;
      const one = await updateService(cid, data);
      // return res.json({
      //    statusCode: 200,
      //    message: "CART UPDATED: " + one.id,
      //    response: one,
      // });
      return res.response200(one);
   } catch (error) {
      return next(error);
   }
}
async function destroy(req, res, next) {
   try {
      const { user_id } = req.cookies.token;
      const one = await destroyService(user_id);
      // return res.json({
      //    statusCode: 200,
      //    response: one,
      // });
      return res.response200(one);
   } catch (error) {
      return next(error);
   }
}

export { create, read, readOne, paginate, update, destroy };
