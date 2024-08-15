import { expect } from "chai";
import supertest from "supertest";
import environment from "../../src/utils/env.util.js";
import usersRepository from "../../src/repositories/users.rep.js";
import productsRepository from "../../src/repositories/products.rep.js";

const requester = supertest(`http://localhost:${environment.PORT}/api`);

describe("Testeando CODER API", function () {
   this.timeout(20000);
   const user = {
      email: "email@email.com",
      password: "hola1234",
      role: "1",
      verify: true, //TUVE QUE CAMBIAR LA PROPIEDAD DEL DTO A TRUE PARA QUE FUNCIONE
   };
   console.log(user);
   const product = {
      title: "campera",
      category: "abrigo",
   };
   let token = "";
   it("Registro de un usuario", async () => {
      const response = await requester.post("/sessions/register").send(user);
      const { _body } = response;
      console.log(_body);
      expect(_body.statusCode).to.be.equals(201);
   });
   it("Inicio de sesion de un usuario", async () => {
      const response = await requester.post("/sessions/login").send(user);
      const { _body, headers } = response;
      console.log(headers);
      console.log(_body);
      token = headers["set-cookie"][0].split(";")[0];
      expect(_body.statusCode).to.be.equals(200);
   });
   it("creacion de un producto por parte de un administrador", async () => {
      const response = await requester
         .post("/products")
         .send(product)
         .set("Cookie", token);
      const { _body } = response;
      expect(_body.statusCode).to.be.equals(201);
   });
   it("Eliminación de un poducto por parte de un administrador", async () => {
      const foundProduct = await productsRepository.readOneRepository(uid);
      const response = await requester
         .delete("/products/" + foundProduct._id)
         .set("Cookie", token);
      const { _body } = response;
      expect(_body.statusCode).to.be.equals(200);
   });
   it("Eliminación de un poducto sin iniciar sesion", async () => {
      const response = await requester
         .delete("/products/12335534rWER")
         .send(product);
      const { _body } = response;
      expect(_body.statusCode).to.be.equals(401);
   });
   it("cerrado de sesion", async () => {
      const response = await requester
         .post("sessions/signout")
         .set("Cookie", token);
      const { _body } = response;
      expect(_body.statusCode).to.be.equals(200);
   });
   it("Eliminacion de un usuario", async () => {
      const foundUser = await usersRepository.readByEmailRepository(user.email);
      console.log(foundUser);
      const response = await requester.delete("/users/" + foundUser._id);
      const { _body } = response;
      expect(_body.statusCode).to.be.equals(200);
   });
});
