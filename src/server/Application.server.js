import express from "express";
import cors from "cors";
import authRoutes from "../routes/auth.routes.js";
import userRoutes from "../routes/user.routes.js";
import swaggerUI from "swagger-ui-express";
import { swaggerDocumentationSpec } from "../documentation/swagger.documentation.js";

export class Application {
  constructor() {
    this.app = express();
    this.paths = {
      auth: "/api/auth",
      users: "/api/users"
    }
    this.middlewares();
    this.defineRoutes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("src/public"));
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentationSpec));
  }

  defineRoutes() {
    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.users, userRoutes);
  }

  start() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  }
}
