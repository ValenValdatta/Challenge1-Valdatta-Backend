import CustomRouter from "../CustomRouter.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { register, login, resetPassword, profile, signout, google, verifyCode, verifyPassCode } from "../../controllers/sessions.controller.js"
import validator from "../../middlewares/joi.mid.js";
import userSchema from "../../schemas/user.schema.js";

class SessionRouter extends CustomRouter {
   init() {
      this.create( "/register", ["PUBLIC"], validator(userSchema), passportCb("register"), register);
      this.create( "/login", ["PUBLIC"], passportCb("login"), login);
      this.create("/verify", ["PUBLIC"], verifyCode);
      this.create("/verifyPass", ["PUBLIC"], passportCb("reset-password"), resetPassword);
      this.read("/", ["USER", "ADMIN"], passportCb("jwt"), profile);
      this.create("/signout", ["USER", "ADMIN"], signout);
      this.read( "/google", ["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }));
      this.read("/google/callback", ["PUBLIC"], passport.authenticate("google", { session: false }), google );
   }
}

const sessionRouter = new SessionRouter()

export default sessionRouter.getRouter();
