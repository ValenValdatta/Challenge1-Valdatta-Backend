import { Router } from "express";
// import userManager from "../../data/fs/UserManager.js";
import usersManager from "../../data/mongo/UsersManager.mongo.js";
import uploader from "../../middlewares/multer.mid.js";
import isPhoto from "../../middlewares/isPhoto.js";

const usersRouter = Router()

usersRouter.get("/", read)
usersRouter.get("/:email", readByEmail)
usersRouter.post("/", uploader.single("photo"), isPhoto, create);
usersRouter.put("/:uid", update);
usersRouter.delete("/:uid", destroy);


async function read (req, res, next) {
    try {
       const { email } = req.query;
       const all = await usersManager.read(email);
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

async function readByEmail (req, res, next) {
    try {
       const { email } = req.params;
       let one = undefined

       if(email) {
         one = await usersManager.readByEmail(email)
       }
       if (one) {
          return res.json({
             statusCode: 200,
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
      const one = await usersManager.create(data);
      return res.json({
         statusCode: 201,
         message: "CREATED USER: " + one.id,
      });
   } catch (error) {
    return next(error)
   }
}

async function update(req, res, next) {
   try {
      const { uid } = req.params;
      const data = req.body;
      const one = await usersManager.update(uid, data);
      return res.json({
         statusCode: 200,
         message: "USER UPDATED: " + one.id,
         response: one,
      });
   } catch (error) {
    return next(error)
   }
}

async function destroy(req, res, next) {
   try {
      const { uid } = req.params;
      const one = await usersManager.destroy(uid);
      return res.json({
         statusCode: 200,
         response: one,
      });
   } catch (error) {
      return next(error)
   }
}


export default usersRouter