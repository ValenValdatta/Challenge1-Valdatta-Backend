import fs from "fs";
import crypto from "crypto";

class ProductManager {
   constructor() {
      this.path = "./src/data/fs/files/products.json";
      this.init();
   }
   init() {
      const exists = fs.existsSync(this.path);
      if (!exists) {
         const stringData = JSON.stringify([], null, 2);
         fs.writeFileSync(this.path, stringData);
         console.log("Archivo creado!");
      } else {
         console.log("El archivo ya existe!!");
      }
   }
   async create(data) {
      try {
         const product = {
            id: crypto.randomBytes(12).toString("hex"),
            title: data.title,
            photo: data.photo || "data:image/jpeg;base64,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",
            category: data.category,
            price: data.price,
            stock: data.stock,
         };
         let all = await fs.promises.readFile(this.path, "utf-8");
         all = JSON.parse(all);
         all.push(product);
         all = JSON.stringify(all, null, 2);
         await fs.promises.writeFile(this.path, all);
         console.log("Producto creado!");
         return product;
      } catch (error) {
         throw error;
      }
   }
   async read(cat = null) {
      try {
         let all = await fs.promises.readFile(this.path, "utf-8");
         all = JSON.parse(all);
         //DEBAJO ES EL FILTRO PARA QUE FILTRE CATEGORIAS POR QUERY
         if (all.length === 0) {
            throw new Error("no hay productos para leer");
         }
         if (cat !== null) {
            all = all.filter((each) => each.category === cat);
            return all;
         } else {
            console.log(all);
            return all;
         }
      } catch (error) {
         throw error;
      }
   }
   async readOne(pid) {
      try {
         let all = await fs.promises.readFile(this.path, "utf-8");
         all = JSON.parse(all);
         let one = all.find((each) => each.id === pid);
         if (!one) {
            throw new Error("no se encontro el id");
         } else {
            console.log(one);
            console.log("Se ha leido el producto" + pid);
            return one;
         }
      } catch (error) {
         throw error;
      }
   }
   async update(id, data) {
      try {
         let all = await this.read();
         let one = all.find((each) => each.id === id);
         if (one) {
            for (let prop in data) {
               one[prop] = data[prop];
            }
            all = JSON.stringify(all, null, 2);
            await fs.promises.writeFile(this.path, all);
            return one;
         } else {
            const error = new Error("Not Found");
            error.statusCode = 404;
            throw error;
         }
      } catch (error) {
         throw error;
      }
   }
   async destroy(id) {
      try {
         let all = await fs.promises.readFile(this.path, "utf-8");
         all = JSON.parse(all);
         let one = all.find((each) => each.id === id);
         if (!one) {
            throw new Error("no se encontro el id");
         } else {
            let filtered = all.filter((each) => each.id !== id);
            filtered = JSON.stringify(filtered, null, 2);
            await fs.promises.writeFile(this.path, filtered);
            console.log({ deleted: one.id });
            return one;
         }
      } catch (error) {
         throw error;
      }
   }
}

async function crearProducto() {
   try {
      const product = new ProductManager();
      await product.create({
         title: "Samsung",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_999462-MLA54226388761_032023-F.webp",
         category: "Celular",
         price: 200,
         stock: 100,
      });
      await product.create({
         title: "Apple",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_803992-MLA52988770428_122022-F.webp",
         category: "Ipad",
         price: 350,
         stock: 50,
      });
      await product.create({
         title: "Motorola",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_648883-MLU74182500303_012024-F.webp",
         category: "Celular",
         price: 180,
         stock: 150,
      });
      await product.create({
         title: "LG",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_890387-MLU72561172985_102023-F.webp",
         category: "Televisores",
         price: 250,
         stock: 70,
      });
      await product.create({
         title: "Samsung",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_932527-MLU74941617888_032024-F.webp",
         category: "Smartwatch",
         price: 150,
         stock: 40,
      });
      await product.create({
         title: "Redmi",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_677855-MLA71570451917_092023-F.webp",
         category: "Auriculares",
         price: 50,
         stock: 100,
      });
      await product.create({
         title: "Thonet & Vander",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_983546-MLA46639054784_072021-F.webp",
         category: "Parlantes",
         price: 200,
         stock: 25,
      });
      await product.create({
         title: "Lenovo",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_955406-MLU75052357569_032024-F.webp",
         category: "Notebook",
         price: 400,
         stock: 20,
      });
      await product.create({
         title: "Iphone",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_779617-MLA71782867320_092023-F.webp",
         category: "Celular",
         price: 300,
         stock: 45,
      });
      await product.create({
         title: "Kingstone",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_633091-MLA72513712313_102023-F.webp",
         category: "Disco SSD",
         price: 100,
         stock: 55,
      });
      await product.create({
         title: "ASUS",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_952312-MLU74957524509_032024-F.webp",
         category: "Notebook",
         price: 380,
         stock: 25,
      });
      await product.create({
         title: "Gigabyte",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_877188-MLU72635661279_112023-F.webp",
         category: "Disco SSD",
         price: 95,
         stock: 60,
      });
      await product.create({
         title: "Samsung",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_722684-MLU72859230576_112023-F.webp",
         category: "Televisores",
         price: 300,
         stock: 45,
      });
      await product.create({
         title: "Noblex",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_634578-MLA51821138734_102022-F.webp",
         category: "Televisores",
         price: 200,
         stock: 66,
      });
      await product.create({
         title: "Sony",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_793501-MLA46946723649_082021-F.webp",
         category: "Parlantes",
         price: 400,
         stock: 25,
      });
      await product.create({
         title: "JBL",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_651387-MLU73885145681_012024-F.webp",
         category: "Auriculares",
         price: 50,
         stock: 75,
      });
      await product.create({
         title: "Gadnic",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_983632-MLU72564532828_112023-F.webp",
         category: "Smartwatch",
         price: 70,
         stock: 65,
      });
      await product.create({
         title: "Xiaomi",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_942099-MLA49011470720_022022-F.webp",
         category: "Smartwatch",
         price: 60,
         stock: 25,
      });
      await product.create({
         title: "DELL",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_696185-MLA54896761378_042023-F.webp",
         category: "Notebook",
         price: 420,
         stock: 37,
      });
      await product.create({
         title: "Sennheiser",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_869047-MLU73664511884_012024-F.webp",
         category: "Auriculares",
         price: 200,
         stock: 15,
      });
      await product.read();
      // await product.readOne("cc5e11bec04c8abe6e25f401");
      // await product.destroy("e47553490765213afb192d01");
   } catch (error) {
      console.log(error);
   }
}

// crearProducto()

const productManager = new ProductManager();
export default productManager;
