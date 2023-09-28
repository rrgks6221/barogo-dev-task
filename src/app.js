import { config } from 'dotenv';
import express, { json, urlencoded } from 'express';
import { clientErrorExceptionFilter } from './middleware/exception-filters/client-error-exception.filter.js';
import { serverErrorExceptionFilter } from './middleware/exception-filters/server-error-exception.filter.js';
import drinks from './routes/index.js';

config();

const app = express();

// request body parsing
app.use(json());

// urlencoded request body parsing
app.use(urlencoded({ extended: true }));

// routers
app.use('/api', drinks);

// exception filters
app.use(clientErrorExceptionFilter, serverErrorExceptionFilter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.info(`Start the server on port ${PORT}`);
});
