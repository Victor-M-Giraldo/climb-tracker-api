import * as UserController from '../controllers/UserController.js';
import {
  registrationValidations,
  loginValidations,
} from '../validations/UserValidations.js';
import { withValidation } from '../validations/validationUtils.js';
import { Router } from 'express';
import ClimbRouter from './ClimbRouter.js';
import passport from '../config/auth/passport.js';

const UserRouter = Router();

UserRouter.post(
  '/register',
  withValidation(registrationValidations),
  UserController.registerUser
);

UserRouter.post(
  '/login',
  withValidation(loginValidations),
  UserController.loginUser
);

UserRouter.use(
  '/:userId/climbs',
  passport.authenticate('jwt', { session: false }),
  ClimbRouter
);

export default UserRouter;
