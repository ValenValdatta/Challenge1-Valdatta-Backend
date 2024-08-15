import { expect } from "chai"
import dao from "../../src/data/dao.factory.js"
const { usersManager } = dao

describe(
    "testeando el recurso users",
    () => {
        const data = { email: "email@email.com", password: "hola1234", verifyCode: "true" }
        let id;
        it(
            "testeando que la creacion de un usuario reciba un objeto con la propiedad email",
            () => {
                expect(data).to.have.property("email")
            }
        )
        it(
            "testeando que la creacion de un usuario reciba un objeto con la propiedad email y sea de tipo string",
            () => {
                expect(data.email).to.be.a("string")
            }
        )
        it(
            "testeando que la creacion de un usuario reciba un objeto con la propiedad password",
            () => {
                expect(data).to.have.property("password")
            }
        )
        it(
            "testeando que la creacion de un usuario reciba un objeto con la propiedad password y sea de tipo string",
            () => {
                expect(data.password).to.be.a("string")
            }
        )
        // it(
        //     "testeando que la creacion de un usuario reciba un objeto con la propiedad photo",
        //     () => {
        //         expect(data).to.have.property("photo").that.exist;
        //     }
        // )
        it(
            "testeando que la creacion de un usuario devuelve un objeto con un _id",
            async () => {const response = await usersManager.create(data)
            id = response._id
            expect(response).to.have.property("_id")
        })
        it (
            "testeando la actualizacion de un usuario",
            async () => {
                const one = await usersManager.readOne(id)
                const response = await usersManager.update(id, {email: "pepe@email.com"})
                expect(one.email).is.not.equal(response.email)
            }
        )
        it (
            //la descripcion del test
            "testeando la eliminacion de un usuario",
            async () => {
                const response = await usersManager.destroy(id)
                const one = await usersManager.readOne(id)
                expect(one).not.exist
            }
        )
    }
)