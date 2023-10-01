import app from '../app.js';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.info(`Start the server on port ${PORT}`);
});
