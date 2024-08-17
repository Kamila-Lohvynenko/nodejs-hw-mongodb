import 'dotenv/config';
import express from 'express';
// import pino from 'pino-http';
import cors from 'cors';
import { errorMiddleware } from './middlewares/ErrorHandler.js';
import { notFoundMiddleware } from './middlewares/notFoundHandler.js';
import contactRoutes from './routers/contacts.js';
import authRouter from './routers/auth.js';

export const setupServer = () => {
  const app = express();

  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Hello world');
  });
  app.use('/auth', authRouter);
  app.use('/contacts', contactRoutes);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  const PORT = parseInt(process.env.PORT) || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}!`);
  });
};
