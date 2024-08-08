import dbConnect from "../utils/dbConnect.js";
import "../utils/env.util.js";
import { faker } from "@faker-js/faker";
import usersRepository from "../repositories/users.rep.js";

async function createData() {
   try {
      dbConnect();
      for (let i = 1; i <= 2; i++) {
         const user = {
            email: faker.internet.email(),
            password: "hola1234",
            photo: faker.image.urlLoremFlickr({ category: "avatar" }),
            age: faker.number.int({ min: 18, max: 100 }),
         };
         await usersRepository.createRepository(user);
         }
        console.log("users created");
   } catch (error) {
      console.log(error);
   }
}

createData();
