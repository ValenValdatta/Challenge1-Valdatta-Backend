import Service from "./service.js"
import productsManager from "../data/mongo/ProductsManager.mongo.js"
import productsRepository from "../repositories/products.rep.js";
// import dao from "../data/dao.factory.js";
// const { products } = dao

// const productsService = new Service(productsManager)
const productsService = new Service(productsRepository)
export const { createService, readService, readOneService, paginateService, updateService, destroyService } = productsService;