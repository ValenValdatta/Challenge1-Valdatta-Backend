import Service from "./service.js";
import usersManager from "../data/mongo/UsersManager.mongo.js";
import usersRepository from "../repositories/users.rep.js"
// import dao from "../data/dao.factory.js";
// const { users } = dao

const usersService = new Service(usersRepository)
export const { createService, readService, readOneService, readByEmailService, paginateService, updateService, destroyService } = usersService