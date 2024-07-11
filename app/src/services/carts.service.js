import Service from "./service.js";
import cartsManager from "../data/mongo/CartsManager.mongo.js"
import cartsRepository from "../repositories/carts.rep.js";
// import dao from "../data/dao.factory.js";
// const { carts } = dao

// const cartsService = new Service(cartsManager)
const cartsService = new Service(cartsRepository)
export const { createService, readService, readOneService, updateService, destroyService } = cartsService