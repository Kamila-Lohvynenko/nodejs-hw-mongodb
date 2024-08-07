import { Contact } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (id) => {
  return await Contact.findById(id);
};

export const createContact = async (payload) => {
  return await Contact.create(payload);
};
export const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};
export const patchContact = async (id, payload) => {
  return await Contact.findByIdAndUpdate(id, payload, { new: true });
};
