import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContact,
} from '../services/contacts.js';
import mongoose from 'mongoose';
import createHttpError from 'http-errors';

export async function getContactsController(req, res) {
  const contacts = await getAllContacts();
  console.log(contacts);
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactController(req, res, next) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createHttpError(404, 'Contact not found'));
  }
  const contact = await getContactById(id);
  console.log({ contact });

  if (contact === null) {
    return next(createHttpError(404, 'Contact not found'));
  }
  res.json({
    status: 200,
    message: `Successfully get contact with id ${id}!`,
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
  };
  const newContact = await createContact(contact);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
}
export async function deleteContactController(req, res, next) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createHttpError(404, 'Contact not found'));
  }
  const result = await deleteContact(id);
  if (result === null) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).end();
}

export async function patchContactController(req, res, next) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createHttpError(404, 'Contact not found'));
  }
  const updatedContact = await patchContact(id, req.body);
  if (updatedContact === null) {
    return next(createHttpError(404, 'Contact not found'));
  }
  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
}
