import { createService, readService, readOneService, updateService, destroyService, paginateService } from "../services/users.service.js";

class UsersController {
   async create(req, res, next) {
      try {
         const data = req.body;
         const one = await createService(data);
         return res.json({
            statusCode: 201,
            message: "CREATED USER: " + one._id,
         });
      } catch (error) {
         return next(error);
      }
   }
   async read(req, res, next) {
      try {
         const email = req.user.email;
         const all = await readService( email );
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
   async readOne(req, res, next) {
      try {
         const { uid } = req.params;
         const one = await readOneService(uid);
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
         return next(error);
      }
   }
   async paginate(req, res, next) {
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
         return res.json({
            statusCode: 200,
            response: all.docs,
            info: {
               page: all.page,
               totalPages: all.totalPages,
               limit: all.limit,
               prevPage: all.prevPage,
               nextPage: all.nextPage,
            },
         });
      } catch (error) {
         return next(error);
      }
   }
   async update(req, res, next) {
      try {
         const { uid } = req.params;
         const data = req.body;
         const one = await updateService(uid, data);
         return res.json({
            statusCode: 200,
            message: "USER UPDATED: " + one.id,
            response: one,
         });
      } catch (error) {
         return next(error);
      }
   }
   async destroy(req, res, next) {
      try {
         const { uid } = req.params;
         const one = await destroyService(uid);
         return res.json({
            statusCode: 200,
            response: one,
         });
      } catch (error) {
         return next(error);
      }
   }
}

const userController = new UsersController();
const { read, paginate, readOne, create, update, destroy } = userController;
export { read, paginate, readOne, create, update, destroy };
