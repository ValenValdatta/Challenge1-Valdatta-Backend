import CustomRouter from "../CustomRouter.js";
import uploader from "../../middlewares/multer.mid.js";
import isPhoto from "../../middlewares/isPhoto.js";
import { read, paginate, readOne, create, update, destroy } from "../../controllers/users.controller.js"

class UsersRouter extends CustomRouter {
   init() {
      this.read("/", ["USER"], read);
      this.read("/paginate", ["USER"], paginate);
      this.read("/:uid", ["USER"], readOne);
      this.create("/", ["ADMIN"], uploader.single("photo"), isPhoto, create);
      this.update("/:uid", ["ADMIN"], update);
      this.destroy("/:uid", ["ADMIN"], destroy);
   }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();

