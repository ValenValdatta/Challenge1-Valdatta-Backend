class Manager {
   constructor(Model) {
      this.Model = Model;
   }
   async create(data) {
      try {
         const one = await this.Model.create(data);
         return one;
      } catch (error) {
         throw error;
      }
   }
   async read(filter) {
      try {
         const all = await this.Model.find(filter); //.populate("user_id", "-_id email photo");
         return all;
      } catch (error) {
         throw error;
      }
   }
   async paginate({ filter, opts }) {
      try {
         const all = await this.Model.paginate(filter, opts);
         return all;
      } catch (error) {
         throw error;
      }
   }
   async aggregate( obj ) {
      try {
         const all = await this.Model.aggregate(obj);
         return all;
      } catch (error) {
         throw error;
      }
   }
   async readOne(id) {
      try {
         const one = await this.Model.findById(id);
         return one;
      } catch (error) {
         throw error;
      }
   }
   async readByEmail(email) {
      try {
         const one = await this.Model.findOne({ email });
         return one;
      } catch (error) {
         throw error;
      }
   }
   async update(id, data) {
      try {
         const one = this.Model.findOneAndUpdate(id, data, { new: true });
         return one;
      } catch (error) {
         throw error;
      }
   }
   async destroy(id) {
      try {
         const one = this.Model.findByIdAndDelete(id);
         return one;
      } catch (error) {
         throw error;
      }
   }
}

export default Manager;
