const Registration = require('../models/Registration');
const Event = require('../models/Event');

const registerForEvent = async (eventId, userId) => {
  const event = await Event.findById(eventId);
  if (!event) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    throw error;
  }

  const existingRegistration = await Registration.findOne({ eventId, userId });
  if (existingRegistration) {
    const error = new Error('Already registered for this event');
    error.statusCode = 409;
    throw error;
  }

  const registration = await Registration.create({
    eventId,
    userId,
  });

  return registration;
};

const getEventRegistrations = async (eventId, userId) => {
  const event = await Event.findById(eventId);
  if (!event) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    throw error;
  }

  if (event.createdBy.toString() !== userId) {
    const error = new Error('User not authorized to view registrations for this event');
    error.statusCode = 403;
    throw error;
  }

  const registrations = await Registration.find({ eventId })
    .populate('userId', 'name email college department')
    .sort('-registeredAt');

  return registrations.map(reg => ({
    _id: reg._id,
    user: reg.userId,
    registeredAt: reg.registeredAt
  }));
};

module.exports = {
  registerForEvent,
  getEventRegistrations,
};
