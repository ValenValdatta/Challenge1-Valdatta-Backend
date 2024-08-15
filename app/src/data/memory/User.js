class UsersManager {
   static quantity = 0;
   static #user = [];

   async create(data) {
      UsersManager.#user.push(data) && UsersManager.quantity++;
      return data
   }
   async read() {
      return UsersManager.#user;
   }
   async readOne(id) {
      try {
         let one = await UsersManager.#user.find((each) => each === id);
         if (!one) {
            throw new Error("el producto no existe!");
         } else {
            console.log(one);
            return one;
         }
      } catch (error) {
         throw error;
      }
   }
   async destroy(id) {
      try {
         let one = await UsersManager.#user.find((each) => each === id);
         if (!one) {
            throw new Error("el producto no existe!");
         } else {
            let filtered = product.filter((each) => each.id !== id);
            product.push(filtered);
            console.log(one);
            return one;
         }
      } catch (error) {
         throw error;
      }
   }
}
async function crearUsuario() {
   try {
      const user = new UsersManager();
      await user.create({
         photo: "foto",
         email: "admin@gmail.com",
         password: "admin123",
         role: "admin",
      });
      await user.create({
         photo: "foto",
         email: "user1@gmail.com",
         password: "user1!",
         role: "user",
      });
      await user.create({
         photo: "foto",
         email: "user2@gmail.com",
         password: "user2!",
         role: "user",
      });
      await user.create({
         photo: "foto",
         email: "user3@gmail.com",
         password: "user3!",
         role: "user",
      });
      console.log(user.read());
      user.readOne("2");
   } catch (error) {
      throw error;
   }
}

const usersManager = new UsersManager();
export default usersManager;