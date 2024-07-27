import 'dotenv/config';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { errorMiddleware } from './middlewares/ErrorMiddleware.js';
import { notFoundMiddleware } from './middlewares/NotFoundMiddleware.js';
import { getAllContacts, getContactById } from './services/contacts.js';
import mongoose from 'mongoose';

export const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Hello world');
  });
  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      console.log(contacts);
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  app.get('/contacts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: 400,
          message: `Invalid contact ID: ${id}`,
        });
      }
      const contact = await getContactById(id);
      if (contact === null) {
        return res.status(404).json({
          status: 404,
          message: `Contact with id ${id} not found!`,
        });
      }
      res.json({
        status: 200,
        message: `Successfully get contact with id ${id}!`,
        data: contact,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  const PORT = parseInt(process.env.PORT) || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}!`);
  });
};
