import { Router } from "express";
import usersManager from "../../data/mongo/UsersManager.mongo.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidPassword from "../../middlewares/isValidPassword.mid.js";
import passport from "../../middlewares/passport.mid.js";

const sessionRouter = Router();

sessionRouter.post(
   "/register",
   passport.authenticate("register", { session: false }),
   async (req, res, next) => {
      try {
         return res.json({
            statusCode: 201,
            message: "Registered!",
         });
      } catch (error) {
         return next(error);
      }
   }
);

sessionRouter.post(
   "/login",
   passport.authenticate("login", {session: false}),
   async (req, res, next) => {
      try {
         return res.json({
            statusCode: 200,
            message: "Logged in",
            token: req.user.token
         });
      } catch (error) {
         return next(error);
      }
   }
);

sessionRouter.get("/", async (req, res, next) => {
   try {
      if (req.session.online) {
         return res.json({
            statusCode: 200,
            message: "Is online",
            user_id: req.session.user_id,
            email: req.session.email,
            password: req.session.password,
         });
      }
      return res.json({
         statusCode: 401,
         message: "Bad authentication",
      });
   } catch (error) {
      return next(error);
   }
});

sessionRouter.post("/signout", (req, res, next) => {
   try {
      if (req.session.email) {
         req.session.destroy();
         return res.json({
            statusCode: 200,
            message: "Signed Out",
         });
      }
      const error = new Error("invalid credentials");
      error.statusCode = 401;
      throw error;
   } catch (error) {
      return next(error);
   }
});

sessionRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }))
sessionRouter.get("/google/callback", passport.authenticate("google",{ session: false}), (req, res, next) => {
   try {
      return res.json({
         statusCode: 200,
         message: "Logged in with Google"
      })
   } catch (error) {
      return next(error)
   }
})

export default sessionRouter;
