import { Router } from "express";
import sizeManager from "../../data/mongo/SizesManager.mongo.js";

const sizesRouter = Router();

sizesRouter.post("/", async (req, res, next) => {
    try {
        const data = req.body;
        const size = await sizeManager.create(data);
        return res.json({
            statusCode: 201,
            message: "CREATED",
            response: size,
        });
    } catch (error) {
        return next(error)
    }
}
);

sizesRouter.get("/", async (req, res, next) => {
    try {
        const sizes = await sizeManager.read();
        if (sizes.length > 0) {
            return res.json({
                statusCode: 200,
                message: "READ ALL SIZES",
                response: sizes,
            });
        }
    } catch (error) {
        return next(error)
    }
}
);

export default sizesRouter