import express from 'express';
import 'dotenv/config';
import UserRouter from './routes/UserRouter.js';
import ErrorHandler from './middleware/errorhandler.js';

const app = express();

app.use(express.json());

app.use('/users', UserRouter);

app.use(ErrorHandler);

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
