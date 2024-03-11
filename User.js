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
}

const user = new UserManager();
user.create({
   photo: "foto",
   email: "admin@gmail.com",
   password: "admin123",
   role: "admin",
});
user.create({
    photo: "foto",
    email: "user@gmail.com",
    password: "user123",
    role: "user",
 });

console.log(user.read());
