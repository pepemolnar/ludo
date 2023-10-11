import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { routes } from './routes/routes';
import { globalErrorHandler } from './middlewares/GlobalErrorHandler';
const port = process.env.PORT ?? 3000;
const ip = process.env.IP ?? '127.0.0.1';
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(routes);
app.use(globalErrorHandler);
app.listen(Number(port), ip, () => {
    console.log(`Server is running on port ${port}`);
});
