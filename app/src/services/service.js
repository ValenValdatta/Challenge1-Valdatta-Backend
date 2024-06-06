class Service {
   constructor(manager) {
      this.model = manager;
   }
   createService = async (data) => {
      try {
         const one = await this.model.create(data);
         return one;
      } catch (error) {
         throw error;
      }
   };
   readService = async (data) => {
      try {
         const all = await this.model.read(data);
         return all;
      } catch (error) {
         throw error;
      }
   };
   paginateService = async ({ filter, opts }) => {
      try {
         const all = await this.model.paginate({ filter, opts });
         return all;
      } catch (error) {
         throw error;
      }
   };
   readOneService = async (uid) => {
      try {
         const one = await this.model.readOne(uid);
         return one;
      } catch (error) {
         throw error;
      }
   };
   updateService = async (uid, data) => {
      try {
         const one = await this.model.update(uid, data);
         return one;
      } catch (error) {
         throw error;
      }
   };
   destroyService = async (uid) => {
      try {
         const one = await this.model.destroy(uid);
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
