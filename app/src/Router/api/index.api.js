import { Router } from "express";
import productsRouter from "./products.api.js";
import usersRouter from "./users.api.js";
import cartsRouter from "./carts.api.js";
import categoryRouter from "./category.api.js";
import sizesRouter from "./size.api.js";
import clotheRouter from "./clothe.api.js";

const apiRouter = Router()

apiRouter.use("/products", productsRouter)
apiRouter.use("/users", usersRouter)
apiRouter.use("/carts", cartsRouter)
apiRouter.use("/categories", categoryRouter)
apiRouter.use("/sizes", sizesRouter)
apiRouter.use("/clothes", clotheRouter)


export default apiRouter