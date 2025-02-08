import { Router } from 'express';
import * as ClimbController from '../controllers/ClimbController.js';
import {
  createClimbValidations,
  updateClimbValidations,
  deleteClimbValidations,
  getClimbValidations,
} from '../validations/climb-validations.js';
import { withValidation } from '../validations/validation-utils.js';
import NoteRouter from './note-router.js';

const ClimbRouter = Router({ mergeParams: true });

ClimbRouter.use((req, res, next) => {
  res.set('Allow', 'GET, POST, PATCH, DELETE');
  res.set('Content-Type', 'application/json');
  res.set('Accept', 'application/json');
  res.set('Accept-Patch', 'application/json');
  next();
});

ClimbRouter.get('/', ClimbController.getClimbsForUser);

ClimbRouter.get(
  '/:climbId',
  withValidation(getClimbValidations),
  ClimbController.getClimb
);

ClimbRouter.post(
  '/',
  withValidation(createClimbValidations),
  ClimbController.createClimb
);

ClimbRouter.patch(
  '/:climbId',
  withValidation(updateClimbValidations),
  ClimbController.updateClimb
);

ClimbRouter.delete(
  '/:climbId',
  withValidation(deleteClimbValidations),
  ClimbController.deleteClimb
);

ClimbRouter.use('/', NoteRouter);

export default ClimbRouter;
