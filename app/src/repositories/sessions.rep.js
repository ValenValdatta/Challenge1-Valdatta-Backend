import dao from "../data/dao.factory.js";
import UsersDTO from "../dto/users.dto.js";
const { users } = dao;

class SessionsRepository {
    constructor() {
      this.model = users;
    }
    createRepository = async (data) => {
      try {
        data = new UsersDTO(data)
        const one = await this.model.create(data);
        return one;
      } catch (error) {
        throw error;
      }
    };
    readRepository = async (role) => {
      try {
        const all = await this.model.read(role);
        return all;
      } catch (error) {
        throw error;
      }
    };
    paginateRepository = async ({ filter, opts }) => {
      try {
        const all = await this.model.paginate({ filter, opts });
        return all;
      } catch (error) {
        throw error;
      }
    };
    readOneRepository = async (uid) => {
      try {
        const one = await this.model.readOne(uid);
        return one;
      } catch (error) {
        throw error;
      }
    };
    readByEmailRepository = async (email) => {
      try {
         const one = await this.model.readByEmail( email );
         return one;
      } catch (error) {
         throw error;
      }
   }
    updateRepository = async (uid, data) => {
      try {
        const one = await this.model.update(uid, data);
        return one;
      } catch (error) {
        throw error;
      }
    };
    destroyRepository = async (uid) => {
      try {
        const one = await this.model.destroy(uid);
        return one;
      } catch (error) {
        throw error;
      }
    };
  }
  
const sessionsRepository = new SessionsRepository(users);
export default sessionsRepository;