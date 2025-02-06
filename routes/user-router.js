import * as UserController from '../controllers/UserController.js';
import {
  registrationValidations,
  loginValidations,
} from '../validations/user-validations.js';
import { withValidation } from '../validations/validation-utils.js';
import { Router } from 'express';
import ClimbRouter from './climb-router.js';
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
