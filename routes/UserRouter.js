import * as UserController from "../controllers/UserController.js";
import {
  registrationValidations,
  loginValidations,
  withValidation,
} from "../validations/UserValidations.js";
import { Router } from "express";

const UserRouter = Router();

UserRouter.post(
  "/register",
  withValidation(registrationValidations),
  UserController.registerUser,
);

export default UserRouter;
