import { readByEmailService } from "../services/sessions.service.js";

class SessionsController {
   async register(req, res, next) {
      try {
         // return res.json({
         //    statusCode: 201,
         //    message: "Registered!",
         // });
         return res.response201();
      } catch (error) {
         return next(error);
      }
   }
   async login(req, res, next) {
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
   async verifyCode(req, res, next) {
      const { email, code } = req.body;
      const one = await readByEmailService(email);
      const verify = code === one.verifyCode;
      if (verify) {
         await updateService(one._id, { verify });
         return res.message200("verified user");
      } else {
         return res.error400("not verified");
      }
   }
   async profile(req, res, next) {
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
   }
   signout(req, res, next) {
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
   }
   google(req, res, next) {
      try {
         return res.json({
            statusCode: 200,
            message: "Logged in with Google",
         });
      } catch (error) {
         return next(error);
      }
   }
}

const sessionController = new SessionsController();
const { register, login, verifyCode, profile, signout, google } = sessionController;
export { register, login, verifyCode, profile, signout, google };
