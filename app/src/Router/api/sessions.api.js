import CustomRouter from "../CustomRouter.js";
import passport from "../../middlewares/passport.mid.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class SessionRouter extends CustomRouter {
   init() {
      this.create(
         "/register",
         ["PUBLIC"],
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

      this.create(
         "/login",
         ["PUBLIC"],
         passportCb("login"),
         async (req, res, next) => {
            try {
               return res
                  .cookie("token", req.user.token, { signedCookie: true })
                  .json({
                     statusCode: 200,
                     message: "Logged in",
                     // token: req.user.token
                  });
            } catch (error) {
               return next(error);
            }
         }
      );

      this.read("/", ["USER", "ADMIN"], passportCb("jwt"), async (req, res, next) => {
         try {
            console.log(req.user);
            // if (req.session.online) {
            if (req.user.online) {
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

      this.create("/signout", ["USER", "ADMIN"], isAuth, (req, res, next) => {
         try {
            if (req.cookies.token) {
               res.clearCookie("token");
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

      this.read(
         "/google",
         ["PUBLIC"],
         passport.authenticate("google", { scope: ["email", "profile"] })
      );
      this.read(
         "/google/callback",
         ["PUBLIC"],
         passport.authenticate("google", { session: false }),
         (req, res, next) => {
            try {
               return res.json({
                  statusCode: 200,
                  message: "Logged in with Google",
               });
            } catch (error) {
               return next(error);
            }
         }
      );
   }
}

const sessionRouter = new SessionRouter()

export default sessionRouter.getRouter();
