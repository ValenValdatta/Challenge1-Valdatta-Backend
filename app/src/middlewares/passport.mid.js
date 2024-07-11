import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import usersManager from "../data/mongo/UsersManager.mongo.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import usersRepository from "../repositories/users.rep.js";
import UsersDTO from "../dto/users.dto.js";
import sendEmail from "../utils/mailing.util.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";

passport.use(
   "register",
   new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
         try {
            if (!email || !password) {
               const error = new CustomError(errors.invalid);
               return done(error);
            }
            const one = await usersRepository.readByEmailRepository(email);
            if (one) {
               const error = new CustomError(errors.auth)
               return done(error);
            }
            const data = new UsersDTO(req.body);
            const user = await usersRepository.createRepository(data);
            // const hashPassword = createHash(password);
            // console.log("Hashed Password:", hashPassword);
            // req.body.password = hashPassword;

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
               const error = new CustomError(errors.invalid);
               return done(error);
            }
            const verifyPass = verifyHash(password, one.password);
            const verifyAccount = one.verify;
            if (!verifyPass || !verifyAccount) {
               // req.session.email = email;
               // req.session.password = password;
               // req.session.online = true;
               // req.session.role = one.role;
               // req.session.photo = one.photo;
               // req.session.user_id = one._id;
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
            const error = new CustomError(errors.invalid);
            return done(error);
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
