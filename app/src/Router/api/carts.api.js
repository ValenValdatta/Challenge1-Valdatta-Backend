import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, paginate, update, destroy } from "../../controllers/carts.controller.js"

class CartsRouter extends CustomRouter {
   init() {
      this.create("/", ["USER"], create);
      this.read("/", ["USER"], read);
      this.read("/:cid", ["USER"], readOne);
      this.read("/paginate", ["USER"], paginate);
      this.update("/:cid", ["USER"], update);
      this.destroy("/", ["USER"], destroy);
   }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();

