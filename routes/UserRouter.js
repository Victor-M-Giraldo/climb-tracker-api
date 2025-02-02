import * as UserController from "../controllers/UserController.js";
import {
  registrationValidations,
  loginValidations,
  validateRequest,
} from "../validations/UserValidations.js";
import { Router } from "express";

const UserRouter = Router();

UserRouter.use(validateRequest);

UserRouter.post(
  "/register",
  registrationValidations,
  UserController.registerUser,
);

export default UserRouter;
