import express from 'express';
import UserRouter from '../routes/user-router.js';
import ClimbRouter from '../routes/climb-router.js';
import NoteRouter from '../routes/note-router.js';
import passport from '../config/auth/passport.js';
import ErrorHandler from '../middleware/errorhandler.js';

export default function configureApp() {
  const app = express();
  app.use(express.json());
  app.use('/', UserRouter);
  ClimbRouter.use('/', NoteRouter);
  app.use(
    '/climbs',
    passport.authenticate('jwt', { session: false }),
    ClimbRouter
  );
  app.use(ErrorHandler);
  return app;
}
