import { Router } from "express";
import userManager from "../../data/fs/UserManager.js";

const usersRouter = Router()

usersRouter.get("/register",async (req, res, next)=>{
    try {
        const users = await userManager.read()
        return res.render("userRegister", {users})
    } catch (error) {
        return next(error)
    }
})

usersRouter.get("/:uid", async (req, res, next)=>{
    try {
        const {uid} = req.params
        const one = await userManager.readOne(uid)
        return res.render("userDetails", { user: one })
    } catch (error) {
        return next(error)
    }
})

// usersRouter.get("/register", async (req, res, next) => {
//     try {
//         const register = await userManager.read()
//         return res.render("userRegister", {register})
//     } catch (error) {
//         return next(error)
//     }
// })


export default usersRouter