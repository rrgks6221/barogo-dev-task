import { config } from 'dotenv';
import express, { json, urlencoded } from 'express';
import path from 'path';
import views from './client/views/index.js';
import { globalExceptionFilter } from './middleware/exception-filters/global-exception.filter.js';
import drinks from './routes/index.js';

config();

const app = express();

// request body parsing
app.use(json());

// urlencoded request body parsing
app.use(urlencoded({ extended: true }));

// view
app.set('views', './src/client/views');
app.set('view engine', 'ejs');
app.use('/static', express.static(`${path.resolve()}/src/client/static`));

// routers
app.use('/', views);
app.use('/api', drinks);

// exception filters
app.use(globalExceptionFilter);

export default app;
