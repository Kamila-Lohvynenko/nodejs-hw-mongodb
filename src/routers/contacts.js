import express from 'express';
import {
  getContactController,
  getContactsController,
} from '../controllers/contacts.js';

const router = express.Router();

router.get('/', getContactsController);
router.get('/:id', getContactController);

export default router;
