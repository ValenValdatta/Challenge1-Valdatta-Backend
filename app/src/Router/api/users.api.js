import CustomRouter from "../CustomRouter.js";
import uploader from "../../middlewares/multer.mid.js";
import isPhoto from "../../middlewares/isPhoto.js";
import { read, paginate, readOne, create, update, destroy } from "../../controllers/users.controller.js"

class UsersRouter extends CustomRouter {
   init() {
      this.read("/", ["PUBLIC"], read);
      this.read("/paginate", ["PUBLIC"], paginate);
      this.read("/:uid", ["PUBLIC"], readOne);
      this.create("/", ["PUBLIC"], uploader.single("photo"), isPhoto, create);
      this.update("/:uid", ["PUBLIC"], update);
      this.destroy("/:uid", ["PUBLIC"], destroy);
   }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();

