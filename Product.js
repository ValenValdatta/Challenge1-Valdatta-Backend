class ProductManager {
   static quantity = 0;

   static #product = [];

   create(data) {
      const product = {
         id:
            ProductManager.quantity === 0
               ? 1
               : ProductManager.#product[ProductManager.quantity - 1].id + 1,
         title: data.title,
         photo: data.photo,
         category: data.category,
         price: data.price,
         stock: data.stock,
      };
      ProductManager.#product.push(product) && ProductManager.quantity++;
   }
   read() {
      return ProductManager.#product;
   }
}

const product = new ProductManager();
product.create({
   title: "Samsung",
   photo: "foto",
   category: "Celular",
   price: 200,
   stock: 100,
});
product.create({
   title: "Apple",
   photo: "foto",
   category: "Ipad",
   price: 350,
   stock: 50,
});
product.create({
   title: "Motorola",
   photo: "foto",
   category: "Celular",
   price: 180,
   stock: 150,
});
product.create({
   title: "LG",
   photo: "foto",
   category: "Televisores",
   price: 250,
   stock: 70,
});
product.create({
   title: "Samsung",
   photo: "foto",
   category: "Smartwatch",
   price: 150,
   stock: 40,
});

console.log(product.read());
