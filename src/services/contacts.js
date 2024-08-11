import { Contact } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const skip = (page - 1) * perPage;

  const contactQuery = Contact.find();

  if (filter.type !== undefined) {
    contactQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite !== undefined) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsTotalItems, contacts] = await Promise.all([
    Contact.find().merge(contactQuery).countDocuments(),
    Contact.find()
      .merge(contactQuery)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
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
