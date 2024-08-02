import { getAllContacts, getContactById } from '../services/contacts.js';
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
