import { Router } from "express";
import productManager from "../../data/fs/ProductManager.js";

const productsRouter = Router()

productsRouter.get("/real",async (req, res, next)=>{
    try {
        const products = await productManager.read()
        return res.render("products", {products})
    } catch (error) {
        return next(error)
    }
})

productsRouter.get("/:pid", async (req, res, next)=>{
    try {
        const {pid} = req.params
        const one = await productManager.readOne(pid)
        return res.render("productDetails", { product: one })
    } catch (error) {
        return next(error)
    }
})


export default productsRouter