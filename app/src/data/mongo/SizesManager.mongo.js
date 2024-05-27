import Size from "./models/size.model.js";
import Manager from "./Manager.mongo.js";

const sizesManager = new Manager(Size);
export default sizesManager