import { Router } from "express";
import usersManager from "../../data/mongo/UsersManager.mongo.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidPassword from "../../middlewares/isValidPassword.mid.js";
import passport from "../../middlewares/passport.mid.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";

const sessionRouter = Router();

sessionRouter.post(
   "/register",
   // passport.authenticate("register", { session: false }),
   passportCb("register"),
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
   // passport.authenticate("login", {session: false}),
   passportCb("login"),
   async (req, res, next) => {
      try {
         return res.cookie("token",req.user.token, { signedCookie: true }).json({
            statusCode: 200,
            message: "Logged in",
            // token: req.user.token
         });
      } catch (error) {
         return next(error);
      }
   }
);

sessionRouter.get("/", passportCb("jwt"), async (req, res, next) => {
   try {
      // if (req.session.online) {
         if(req.user.online) {
         return res.json({
            statusCode: 200,
            message: "Is online",
            user_id: req.user.user_id,
            email: req.user.email,
            password: req.user.password,
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

sessionRouter.post("/signout", isAuth, (req, res, next) => {
   try {
      if (req.cookies.token) { 
         res.clearCookie('token');
         return res.json({
            statusCode: 200,
            message: "Signed Out",
         });
      }
      const error = new Error("No active session found");
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
