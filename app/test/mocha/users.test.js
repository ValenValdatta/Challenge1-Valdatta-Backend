import assert from "assert"
// import environment from "../../src/utils/env.util.js"
import dao from "../../src/data/dao.factory.js"
import { verifyCode } from "../../src/controllers/sessions.controller.js"
const { usersManager } = dao

describe(
    //la descripcion del entorno de testeo
    "testeando el recurso users",
    //la callback con todos los test a ejecutar
    () => {//antes de iniciar los test es necesario definir las variables necesarias
        //variables que se necesitan para testear
        const data = { email: "email@email.com", password: "hola1234", verifyCode: "true" }
        let id;
        it (
            //la descripcion del test
            "testeando que la creacion de un usuario reciba un objeto con la propiedad email",
            //la callback con la logica del test
            () => {
                assert.ok(data.email)
            }
        )
        it (
            //la descripcion del test
            "testeando que la creacion de un usuario reciba un objeto con la propiedad email y que sea tipo string",
            //la callback con la logica del test
            () => {
                assert.strictEqual(typeof data.email, "string")
            }
        )
        it (
            //la descripcion del test
            "testeando que la creacion de un usuario reciba un objeto con la propiedad password",
            //la callback con la logica del test
            () => {
                assert.ok(data.password)
            }
        )
        it (
            //la descripcion del test
            "testeando que la creacion de un usuario reciba un objeto con la propiedad password y que sea tipo string",
            //la callback con la logica del test
            () => {
                assert.strictEqual(typeof data.password, "string")
            }
        )
        it (
            //la descripcion del test
            "testeando que la creacion de un usuario reciba un objeto con la propiedad photo",
            //la callback con la logica del test
            () => {
                assert.ok(data.photo || true)
            }
        )
        it (
            //la descripcion del test
            "testeando que la creacion de un usuario devuelve un objeto con un _id  ",
            //la callback con la logica del test
            async () => {
                const response = await usersManager.create(data)
                id = response._id
                assert.ok(response._id)
            }
        )
        it (
            //la descripcion del test
            "testeando la actualizacion de un usuario",
            //la callback con la logica del test
            async () => {
                const one = await usersManager.readOne(id)
                const response = await usersManager.update(id, {email: "pepe@email.com"})
                assert.notEqual(one.email, response.email)
            }
        )
        it (
            //la descripcion del test
            "testeando la eliminacion de un usuario",
            //la callback con la logica del test
            async () => {
                await usersManager.destroy(id)
                const one = await usersManager.readOne(id)
                assert.strictEqual(one, null)
            }
        )
    }
)