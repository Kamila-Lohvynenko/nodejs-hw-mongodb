import { Contact } from '../db/models/contacts.js';

export const getAllContacts = () => {
  return Contact.find();
};

export const getContactById = (id) => {
  return Contact.findById(id);
};
