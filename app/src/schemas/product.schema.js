import joi from "joi-oid"

const productSchema = joi.object({
    title: joi.string().required().min(3).max(40).messages({
        "any.required": "el title es requerido",
        "string.empty": "el title no puede ser una cadena de texto vacía",
        "string.min": "el title tiene que tener minimo 3 letras",
        "string.max": "el title tiene que tener maximo 50 letras",
      }),
    category: joi.string(),
    photo: joi.string().uri(),
    price: joi.number(),
    stock: joi.number(),
})

export default productSchema;