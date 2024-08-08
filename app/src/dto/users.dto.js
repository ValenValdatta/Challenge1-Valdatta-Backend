import argsUtil from "../utils/args.util.js";
import crypto, { createSecretKey } from "crypto"
import { createHash } from "../utils/hash.util.js";

const persistence = argsUtil.persistence

class UsersDTO {
    constructor(data) {
        persistence !== "mongo" && (this._id = crypto.randomBytes(12).toString("hex"))
        this.email = data.email;
        this.password = createHash(data.password);
        this.role = data.role || 0;
        this.age = data.age || 18;
        this.photo = data.photo || "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
        this.verify = true
        this.verifyCode = crypto.randomBytes(12).toString("hex")
        this.verifyPassCode = crypto.randomBytes(12).toString("hex")
        persistence !== "mongo" && (this.createdAt = new Date())
        persistence !== "mongo" && (this.updatedAt = new Date())
    }
} 

export default UsersDTO;