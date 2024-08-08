import dbConnect from "../utils/dbConnect.js";
import "../utils/env.util.js";
import { faker } from "@faker-js/faker";
import productsRepository from "../repositories/products.rep.js";

async function createData() {
   try {
      dbConnect();
      for (let i = 1; i <= 2; i++) {
         const product = {
            title: faker.commerce.product(),
            category: faker.commerce.department(),
            photo: faker.image.urlLoremFlickr({ category: "products" }),
            price: faker.number.int({ max: 1000000 }),
            stock: faker.number.int({ max: 100 }),
         };
         await productsRepository.createRepository(product);
         }
        console.log("products created");
   } catch (error) {
      console.log(error);
   }
}

createData();
