import { Router } from 'express';
import * as ClimbController from '../controllers/ClimbController.js';

const ClimbRouter = Router({ mergeParams: true });

ClimbRouter.post('/', ClimbController.createClimb);

export default ClimbRouter;
