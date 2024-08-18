import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function getContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactController(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (contact === null) {
    return next(createHttpError(404, 'Contact not found'));
  }

  if (contact.userId.toString() !== req.user._id.toString()) {
    next(createHttpError(403, 'Contact not allowed'));
  }

  res.json({
    status: 200,
    message: `Successfully get contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user._id,
  };
  const newContact = await createContact(contact);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
}

export async function deleteContactController(req, res, next) {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (contact.userId.toString() !== req.user._id.toString()) {
    next(createHttpError(403, 'Contact not allowed'));
  }

  const result = await deleteContact(contactId);
  if (result === null) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).end();
}

export async function patchContactController(req, res, next) {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (contact.userId.toString() !== req.user._id.toString()) {
    next(createHttpError(403, 'Contact not allowed'));
  }

  const updatedContact = await patchContact(contactId, req.body);
  if (updatedContact === null) {
    return next(createHttpError(404, 'Contact not found'));
  }
  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
}
