import Service from "./service.js";
import usersManager from "../data/mongo/UsersManager.mongo.js";

const usersService = new Service(usersManager)
export const { createService, readService, readOneService, paginateService, updateService, destroyService } = usersService