import express from 'express';
import {
  createContactController,
  deleteContactController,
  getContactController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from './../middlewares/isValidId.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));
router.get(
  '/:contactId',
  isValidId('contactId'),
  ctrlWrapper(getContactController),
);
router.post('/', jsonParser, ctrlWrapper(createContactController));
router.delete(
  '/:contactId',
  isValidId('contactId'),
  ctrlWrapper(deleteContactController),
);
router.patch(
  '/:contactId',
  isValidId('contactId'),
  jsonParser,
  ctrlWrapper(patchContactController),
);

export default router;
