import { Router } from 'express';
import * as ClimbController from '../controllers/ClimbController.js';
import {
  createClimbValidations,
  updateClimbValidations,
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

ClimbRouter.get('/:climbId', ClimbController.getClimbsForUser);

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

ClimbRouter.delete('/:climbId', ClimbController.deleteClimb);

ClimbRouter.use('/:climbId/notes', NoteRouter);

export default ClimbRouter;
