import express from 'express';
import {
  createContactController,
  deleteContactController,
  getContactController,
  getContactsController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:id', ctrlWrapper(getContactController));
router.post('/', jsonParser, ctrlWrapper(createContactController));
router.delete('/:id', ctrlWrapper(deleteContactController));

export default router;
