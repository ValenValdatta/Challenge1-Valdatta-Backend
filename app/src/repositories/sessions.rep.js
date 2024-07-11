import dao from "../data/dao.factory.js";
const {sessionManager} = dao

class SessionsRepository {
    constructor() {
      this.model = sessionManager;
    }
    createRepository = async (data) => {
      try {
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
         const one = await this.model.readByEmail( {email} );
         return one;
      } catch (error) {
         throw error;
      }
   }
    updateRepository = async (id, data) => {
      try {
        const one = await this.model.update(id, data);
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
  
const sessionsRepository = new SessionsRepository();
export default sessionsRepository;