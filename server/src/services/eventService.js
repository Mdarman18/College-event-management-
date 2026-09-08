const Event = require('../models/Event');
const Registration = require('../models/Registration');

const createEvent = async (eventData, userId) => {
  const event = await Event.create({
    ...eventData,
    createdBy: userId,
  });
  return event;
};

const getEvents = async () => {
  const events = await Event.find()
    .populate('createdBy', 'name email college department')
    .sort('-createdAt');
  return events;
};

const getEventById = async (eventId) => {
  const event = await Event.findById(eventId).populate('createdBy', 'name email college department');
  if (!event) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    throw error;
  }
  return event;
};

const updateEvent = async (eventId, eventData, userId) => {
  let event = await Event.findById(eventId);
  if (!event) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    throw error;
  }

  if (event.createdBy.toString() !== userId) {
    const error = new Error('User not authorized to update this event');
    error.statusCode = 403;
    throw error;
  }

  event = await Event.findByIdAndUpdate(eventId, eventData, {
    new: true,
    runValidators: true,
  });

  return event;
};

const deleteEvent = async (eventId, userId) => {
  const event = await Event.findById(eventId);
  if (!event) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    throw error;
  }

  if (event.createdBy.toString() !== userId) {
    const error = new Error('User not authorized to delete this event');
    error.statusCode = 403;
    throw error;
  }

  await Event.findByIdAndDelete(eventId);
  // Also delete registrations for this event
  await Registration.deleteMany({ eventId });
};

const searchEvents = async (query) => {
  const { college, category, date } = query;
  let filter = {};

  if (college) filter.college = new RegExp(college, 'i');
  if (category) filter.category = new RegExp(category, 'i');
  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
    filter.date = { $gte: startDate, $lt: endDate };
  }

  const events = await Event.find(filter)
    .populate('createdBy', 'name email college department')
    .sort('date');
  return events;
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  searchEvents,
};
