class Service {
   constructor(repository) {
      this.repository = repository;
   }
   createService = async (data) => {
      try {
         const one = await this.repository.createRepository(data);
         return one;
      } catch (error) {
         throw error;
      }
   };
   readService = async (data) => {
      try {
         const all = await this.repository.readRepository(data);
         return all;
      } catch (error) {
         throw error;
      }
   };
   readByEmailService = async (email) => {
      try {
         const all = await this.repository.readByEmailRepository(email);
         return all;
      } catch (error) {
         throw error;
      }
   };
   paginateService = async ({ filter, opts }) => {
      try {
         const all = await this.repository.paginateRepository({ filter, opts });
         return all;
      } catch (error) {
         throw error;
      }
   };
   readOneService = async (uid) => {
      try {
         const one = await this.repository.readOneRepository(uid);
         return one;
      } catch (error) {
         throw error;
      }
   };
   updateService = async (id, data) => {
      try {
         const one = await this.repository.updateRepository(id, data);
         return one;
      } catch (error) {
         throw error;
      }
   };
   destroyService = async (uid) => {
      try {
         const one = await this.repository.destroyRepository(uid);
         return one;
      } catch (error) {
         throw error;
      }
   };
}

export default Service;
// const service = new Service()
// const { createService, readService, updateService, destroyService } = service;
// export { createService, readService, updateService, destroyService }
