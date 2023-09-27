import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

// request body parsing
app.use(express.json());

// urlencoded request body parsing
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.info(`Start the server on port ${PORT}`);
});
