import { expect } from "chai";
import supertest from "supertest";
import environment from "../../src/utils/env.util.js";
import usersRepository from "../../src/repositories/users.rep.js";

const requester = supertest(`http://localhost:${environment.PORT}/api`)

describe(
    "Testeando CODER API",
    function () {
        this.timeout(20000)
        const user = {
            email: "email@email.com",
            password: "hola1234",
            role: "1",
            verify: true,  //TUVE QUE CAMBIAR LA PROPIEDAD DEL DTO A TRUE PARA QUE FUNCIONE
        }
        console.log(user);
        const product = {
            title: "campera",
            category: "abrigo",
        }
        let token = ""
        it(
            "Registro de un usuario",
            async() => {
                const response = await requester.post("/sessions/register").send(user)
                const { _body } = response
                console.log(_body);
                expect(_body.statusCode).to.be.equals(201)
            }
        )
        it(
            "Inicio de sesion de un usuario",
            async() => {
                const response = await requester.post("/sessions/login").send(user)
                const { _body, headers } = response
                console.log(headers);
                console.log(_body);
                token = headers["set-cookie"][0].split(";")[0]
                expect(_body.statusCode).to.be.equals(200) 
            }
        )
        it(
            "Eliminacion de un usuario",
            async() => {
                const foundUser = await usersRepository.readByEmailRepository(user.email)
                console.log(foundUser);
                const response = await requester.delete("/users/"+foundUser._id)
                const { _body } = response
                expect(_body.statusCode).to.be.equals(200)
            }
        )
    }
)