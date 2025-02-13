import express from 'express';
import 'dotenv/config';
import UserRouter from './routes/user-router.js';
import ClimbRouter from './routes/climb-router.js';
import morgan from './config/loggers/morgan.js';
import logger from './config/loggers/winston.js';
import ErrorHandler from './middleware/ErrorHandler.js';
import passport from './config/auth/passport.js';
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan);

app.use('/', UserRouter);
app.use(
  '/climbs',
  passport.authenticate('jwt', { session: false }),
  ClimbRouter
);

app.use(ErrorHandler);

app.listen(process.env.SERVER_PORT || 3000, () => {
  logger.info(`Server is running on port ${process.env.PORT || 3000}`);
});
