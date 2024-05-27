import Clothe from "./models/clothe.model.js";
import Manager from "./Manager.mongo.js";

const clothesManager = new Manager(Clothe);
export default clothesManager