import Service from "./service.js";
import sessionsRepository from "../repositories/sessions.rep.js"

const sessionsService = new Service(sessionsRepository)
export const { createService, readService, readOneService, readByEmailService, paginateService, updateService, destroyService } = sessionsService