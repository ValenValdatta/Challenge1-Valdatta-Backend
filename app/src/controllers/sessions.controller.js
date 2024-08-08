import { readByEmailService, updateService } from "../services/sessions.service.js";

   const register = async (req, res, next) => {
      try {
         // return res.json({
         //    statusCode: 201,
         //    message: "Registered!",
         // });
         return res.response201("User registered!");
      } catch (error) {
         return next(error);
      }
   }
   const login = async (req, res, next) => {
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
   const resetPassword = async (req, res, next) => {
      try {
         return res.response201("Code sent!");
      } catch (error) {
         return next(error);
      }
   }
   const verifyCode = async (req, res, next) => {
      const { email, code } = req.body;
      const one = await readByEmailService(email);
      const verify = code === one.verifyCode;
      console.log(one);
      console.log(code);
      if (verify) {
        await updateService(one._id, { verify });
        return res.message200("Verified User!");
      } else {
        return res.error400("Invalid credentials!");
      }
    };
    const verifyPassCode = async (req, res, next) => {
      const { email, code } = req.body;
      const one = await readByEmailService(email);
      const verify = passCode === one.verifyPassCode;
      console.log(one);
      console.log(code);
      if (verify) {
        await updateService(one._id, { verify });
        return res.message200("Verified Password!");
      } else {
        return res.error400("Invalid credentials!");
      }
    };
   const profile = async (req, res, next) => {
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
   const signout = async (req, res, next) => {
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
   const google = async (req, res, next) => {
      try {
         return res.json({
            statusCode: 200,
            message: "Logged in with Google",
         });
      } catch (error) {
         return next(error);
      }
   }



export { register, login, resetPassword, verifyCode, verifyPassCode, profile, signout, google };
