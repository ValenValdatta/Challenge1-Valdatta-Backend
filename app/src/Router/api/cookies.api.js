import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/set", (req, res, next) => {
   try {
      return res
         .cookie("modo", "nocturno", { maxAge: 10000 })
         .cookie("otra", "otra cookie", { maxAge: 60000 })
         .cookie("online", "true", { maxAge: 60 * 60 * 1000 })
         .json({ message: "la cookie vence en 10s" });
   } catch (error) {
      throw next(error);
   }
});

cookiesRouter.get("/", (req, res, next) => {
   try {
      const cookies = req.cookies;
      return res.json({ cookies });
   } catch (error) {
      throw next(error);
   }
});

cookiesRouter.get("/destroy/:cookie", (req, res, next) => {
    try {
        const {cookie} = req.params
        return res.clearCookie(cookie).json({ message: "cookie " + cookie + " borrada" })
    } catch (error) {
        throw next(error)
    }
})

cookiesRouter.get("/signed", (req, res, next) => {
    try {
        return res.cookie("role", "admin", { signed: true }).json({ message: "cookie firmada con el rol de usuario" })
    } catch (error) {
        return next(error)
    }
})

cookiesRouter.get("/get-signed", (req, res, next) => {
    try {
        return res.json({ message: req.signedCookies })
    } catch (error) {
        return next(error)
    }
})

export default cookiesRouter;
