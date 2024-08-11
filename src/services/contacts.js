import { Contact } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ page, perPage }) => {
  const skip = (page - 1) * perPage;

  const [contactsTotalItems, contacts] = await Promise.all([
    Contact.find().countDocuments(),
    Contact.find().skip(skip).limit(perPage),
  ]);

  const paginationInformation = calculatePaginationData(
    contactsTotalItems,
    page,
    perPage,
  );
  return {
    items: contacts,
    ...paginationInformation,
  };
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
