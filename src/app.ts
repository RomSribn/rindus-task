import 'module-alias/register';
import * as error from '@middlewares/error.mw';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import DBConnection from '@config/db';
import _initRouter from '@api/_init/route';
import fileUpload from 'express-fileupload';
import citiesRouter from '@api/cities/routes/cities.route';
import weatherRouter from '@api/weather/routes/weather.route';
import conditionsRouter from '@api/weather/routes/conditions.route';
import { createServer } from 'http';
import { appConfig } from '@config/env';
import { INIT, CITIES, CONDITIONS, WEATHER } from '@utils/routes.utils';

const { port } = appConfig;
const app = express();

// Cors settings
app.use(
  cors({
    origin: '*',
  }),
);

// File upload
app.use(fileUpload({}));

// Logger
app.use(morgan('dev'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Uploads. Must be below the body parser
app.use(express.static('uploads'));

// DB init
DBConnection.authenticate()
  .then(() => console.log('Connection to the database has been established successfully'))
  .catch(err => console.error(`Unable to connect to the database: ${err}`));
DBConnection.sync();

// Http server and Sockets
const http = createServer(app);

// Routes
app.use(INIT, _initRouter);
app.use(CITIES, citiesRouter);
app.use(CONDITIONS, conditionsRouter);
app.use(WEATHER, weatherRouter);

// Errors
app.use(error.notFound);

// Run server
http.listen(port, () => console.log(`Server started on port ${port}`));
