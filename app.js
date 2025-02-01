import express from 'express';
import 'dotenv/config';

const app = express();

app.use(express.json());

app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
