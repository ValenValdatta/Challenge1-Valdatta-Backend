import fs from "fs";

class UsersManager {
   constructor() {
      this.path = "./src/data/fs/files/users.json";
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
         if (!data.email || !data.password) {
            const error = new Error("Ingrese un Usuario o contraseña");
            throw error;
         } else {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            all.push(data);
            all = JSON.stringify(all, null, 2);
            await fs.promises.writeFile(this.path, all);
            console.log("Usuario creado!");
            return data;
         }
      } catch (error) {
         throw error;
      }
   }
   async read(role) {
      try {
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        role && (all = all.filter((each) => each.role === role));
        return all;
      } catch (error) {
        throw error;
      }
    }
   async readOne(uid) {
      try {
         let all = await fs.promises.readFile(this.path, "utf-8");
         all = JSON.parse(all);
         let one = all.find((each) => each.id === uid);
         if (!one) {
            throw new Error("no se encontro el id");
         } else {
            // console.log(one);
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
         }else {
            const error = new Error("Not Found")
            error.statusCode = 404
            throw error
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

async function crearUsuario() {
   try {
      const user = new UsersManager();
      await user.create({
         photo: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
         email: "admin@gmail.com",
         password: "admin123",
         role: "0",
      });
      await user.create({
         photo: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
         email: "user1@gmail.com",
         password: "user1!",
         role: "0",
      });
      await user.create({
         photo: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
         email: "user2@gmail.com",
         password: "user2!",
         role: "0",
      });
      await user.create({
         photo: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
         email: "user3@gmail.com",
         password: "user3!",
         role: "0",
      });
      await user.read();
      // await user.readOne("c8e1de61c5cc8eeabcf59fa0");
      // await user.destroy("612b2aefd43e55902071a430");
   } catch (error) {
      throw error 
   }
}

// crearUsuario();

const usersManager = new UsersManager()
export default usersManager