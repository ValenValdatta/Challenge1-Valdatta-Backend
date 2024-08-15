import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import usersManager from "../data/mongo/UsersManager.mongo.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import usersRepository from "../repositories/users.rep.js";
import sendEmail from "../utils/mailing.util.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";

passport.use(
   "register",
   new LocalStrategy(
     { passReqToCallback: true, usernameField: "email" },
     async (req, email, password, done) => {
       try {
         let user = await usersRepository.readByEmailRepository(email);
         if (user) {
           const error = CustomError.new(errors.invalid)
           return done(error);
         }
         //1° el dto necesita las propiedades de verificacion
         user = await usersRepository.createRepository(req.body);
         //2° una vez que el usuario se creó
         //la estrategia debe enviar un correo electronico
         //con un codigo aleatorio para la verificacion del usuario
         await sendEmail({
            to: email,
            email: user.email,
            code: user.verifyCode,
         });
         return done(null, user);
       } catch (error) {
         return done(error);
       }
     }
   )
 );

 passport.use(
   "login",
   new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
         try {
            const one = await usersRepository.readByEmailRepository(email);
            if (!one) {
               const error =  CustomError.new(errors.invalid);
               return done(error);
            }
            const verifyPass = verifyHash(password, one.password);
            const verifyAccount = one.verify;
            console.log(verifyPass);
            console.log(verifyAccount);
            if (verifyPass && verifyAccount) {
               const user = {
                  email,
                  role: one.role,
                  photo: one.photo,
                  _id: one._id,
                  online: true,
               };
               const token = createToken(user);
               user.token = token;
               return done(null, user);
            }
            const error = CustomError.new(errors.invalid);
            return done(error);
         } catch (error) {
            return done(error);
         }
      }
   )
);

passport.use(
   'reset-password',
   new LocalStrategy(
     { passReqToCallback: true, usernameField: 'email' },
     async (req, email, password, done) => {
       try {
         // Verificar si el usuario existe
         let user = await usersRepository.readByEmailRepository(email);
         if (!user) {
           const error = CustomError.new(errors.notFound);
           return done(error);
         }
 
         // Generar un código de verificación y enviarlo por correo
         
 
         await sendEmail({
           to: email,
           subject: 'Restablecimiento de contraseña',
           body: `Tu código para restablecer la contraseña es: ${user.resetPasswordToken}`
         });
 
         return done(null, user);
       } catch (error) {
         return done(error);
       }
     }
   )
 );
 passport.use(
   'new-password',
   new LocalStrategy(
     { passReqToCallback: true, usernameField: 'email' },
     async (req, email, password, done) => {
       try {
         // Verificar si el usuario existe
         let user = await usersRepository.readByEmailRepository(email);
         if (!user) {
           const error = CustomError.new(errors.notFound);
           return done(error);
         }

         user = await usersRepository.updateRepository(req.body)
 
         return done(null, user);
       } catch (error) {
         return done(error);
       }
     }
   )
 );

passport.use(
   "google",
   new GoogleStrategy(
      {
         clientID: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         callbackURL: "http://localhost:8080/api/sessions/google/callback",
         passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
         try {
            const { id, picture } = profile;
            let user = await usersRepository.readByEmailRepository(id);
            if (!user) {
               user = {
                  email: id,
                  password: createHash(id),
                  photo: picture,
               };
               user = await usersRepository.create(user);
            }
            req.session.email = user.email;
            req.session.online = true;
            req.session.role = user.role;
            req.session.photo = user.photo;
            req.session.user_id = user._id;
            return done(null, user);
         } catch (error) {
            return done(error);
         }
      }
   )
);

passport.use(
   "jwt",
   new JWTStrategy(
      {
         jwtFromRequest: ExtractJwt.fromExtractors([
            (req) => req?.cookies["token"],
         ]),
         secretOrKey: process.env.SECRET_JWT,
      },
      (data, done) => {
         try {
            if (data) {
               return done(null, data);
            } else {
               const error = new Error("Forbidden from jwt!");
               error.statusCode = 403;
               return done(error);
            }
         } catch (error) {
            return done(error);
         }
      }
   )
);

export default passport;
