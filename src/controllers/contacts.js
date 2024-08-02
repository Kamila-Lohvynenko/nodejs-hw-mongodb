import { getAllContacts, getContactById } from '../services/contacts.js';
import mongoose from 'mongoose';

export async function getContactsController(req, res) {
  const contacts = await getAllContacts();
  console.log(contacts);
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactController(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 400,
      message: `Invalid contact ID: ${id}`,
    });
  }
  const contact = await getContactById(id);
  console.log({ contact });

  if (contact === null) {
    return res.status(404).send({
      status: 404,
      message: `Contact with id ${id} not found!`,
    });
  }
  res.json({
    status: 200,
    message: `Successfully get contact with id ${id}!`,
    data: contact,
  });
}
