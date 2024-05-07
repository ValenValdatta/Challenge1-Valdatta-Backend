import Category from "./models/category.model.js";
import Manager from "./Manager.mongo.js";

const categoryManager = new Manager(Category);
export default categoryManager