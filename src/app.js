import express from 'express';

const app = express();

// request body parsing
app.use(express.json());

// urlencoded request body parsing
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.listen(PORT, () => {
  console.info(`Start the server on port ${PORT}`);
});
