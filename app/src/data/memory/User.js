class UserManager {
   static quantity = 0;

   static #user = [];

   create(data) {
      const user = {
         id:
            UserManager.quantity === 0
               ? 1
               : UserManager.#user[UserManager.quantity - 1].id + 1,
         photo: data.photo,
         email: data.email,
         password: data.password,
         role: data.role,
      };
      UserManager.#user.push(user) && UserManager.quantity++;
   }
   read() {
      return UserManager.#user;
   }
   async readOne(id) {
      try {
         let one = await UserManager.#user.find((each) => each === id);
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
         let one = await UserManager.#user.find((each) => each === id);
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
      const user = new UserManager();
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

crearUsuario();