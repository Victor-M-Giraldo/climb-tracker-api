import { Router } from 'express';
import * as ClimbController from '../controllers/ClimbController.js';
import { createClimbValidations, getClimbValidations } from '../validations/ClimbValidations.js';
import { withValidation } from '../validations/validationUtils.js';

const ClimbRouter = Router({ mergeParams: true });

ClimbRouter.get(
  '/',
  withValidation(getClimbValidations),
  ClimbController.getClimbsForUser
);

ClimbRouter.post(
  '/',
  withValidation(createClimbValidations),ClimbController.createClimb
);

export default ClimbRouter;
