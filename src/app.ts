import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors';
import router from './app/routes';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';
import { notFound } from './app/middlewares/notFound';

const app: Application = express();
app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "Bike Servicing Management API now Running"
    })
});

app.use('/api', router);

app.use(notFound)


app.use(globalErrorHandler);




export default app;