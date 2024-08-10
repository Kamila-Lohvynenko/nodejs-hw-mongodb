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
router.get('/:id', isValidId, ctrlWrapper(getContactController));
router.post('/', jsonParser, ctrlWrapper(createContactController));
router.delete('/:id', isValidId, ctrlWrapper(deleteContactController));
router.patch(
  '/:id',
  isValidId,
  jsonParser,
  ctrlWrapper(patchContactController),
);

export default router;
