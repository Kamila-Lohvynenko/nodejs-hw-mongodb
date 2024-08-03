import { Contact } from '../db/models/contacts.js';

export const getAllContacts = () => {
  return Contact.find();
};

export const getContactById = (id) => {
  return Contact.findById(id);
};

export const createContact = (payload) => {
  return Contact.create(payload);
};
export const deleteContact = (id) => {
  return Contact.findByIdAndDelete(id);
};
export const patchContact = (id, payload) => {
  return Contact.findByIdAndUpdate(id, payload, { new: true });
};
