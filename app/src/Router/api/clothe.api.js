import { Router, response } from "express";
import clotheManager from "../../data/mongo/ClothesManager.mongo.js";

const clotheRouter = Router();

clotheRouter.get("/", async (req, res, next) => {
  try {
    const all = await clotheManager.read();
    return res.json({
      statusCode: 200,
      message: "READ",
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});
clotheRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    //console.log(data)
    const one = await clotheManager.create(data);
    //console.log(one)
    return res.json({
      statusCode: 201,
      message: "CREATED",
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

export default clotheRouter;