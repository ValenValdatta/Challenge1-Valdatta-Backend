import CustomRouter from "../CustomRouter.js";
import productsRouter from "./products.api.js";
import usersRouter from "./users.api.js";
import cartsRouter from "./carts.api.js";
import ticketRouter from "./tickets.api.js";
import cookiesRouter from "./cookies.api.js";
import sessionRouter from "./sessions.api.js";

class ApiRouter extends CustomRouter {
   init() {
      this.use("/products", productsRouter);
      this.use("/users", usersRouter);
      this.use("/carts", cartsRouter);
      this.use("/tickets", ticketRouter);
      this.use("/cookies", cookiesRouter);
      this.use("/sessions", sessionRouter);
   }
}

const apiRouter = new ApiRouter();

export default apiRouter.getRouter()
