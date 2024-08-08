import joi from "joi-oid"

const userSchema = joi.object({
    email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .min(3)
    .max(50).messages({
        "any.required": "el email es requerido",
        "string.empty": "el email no puede ser una cadena de texto vacía",
        "string.email": "el email debe ser válido",
        "string.min": "el email tiene que tener minimo 3 letras",
        "string.max": "el email tiene que tener maximo 50 letras",
      }),
    photo: joi.string().uri(),
    password: joi.string().required().messages({
        "any.required": "la contraseña es requerida",
        "string.empty": "la contraseña no puede ser una cadena de texto vacía",
        "string.pattern.base": "la contraseña debe ser alfanumerica con min/MAY",
        "string.min": "la contraseña tiene que tener minimo 3 letras",
        "string.max": "la contraseña tiene que tener maximo 50 letras",
      }),
    age: joi.number(),
    role: joi.number(),
    verify: joi.boolean(),
    verifyCode: joi.string(),
})

export default userSchema;