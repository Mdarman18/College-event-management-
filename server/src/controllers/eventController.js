const asyncHandler = require('../utils/asyncHandler');
const eventService = require('../services/eventService');

const createEvent = asyncHandler(async (req, res, next) => {
  try {
    const event = await eventService.createEvent(req.body, req.user.id);
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event,
    });
  } catch (error) {
    if (error.statusCode) res.status(error.statusCode);
    next(error);
  }
});

const getEvents = asyncHandler(async (req, res, next) => {
  try {
    const events = await eventService.getEvents();
    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    next(error);
  }
});

const getEventById = asyncHandler(async (req, res, next) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    if (error.statusCode) res.status(error.statusCode);
    next(error);
  }
});

const updateEvent = asyncHandler(async (req, res, next) => {
  try {
    const event = await eventService.updateEvent(req.params.id, req.body, req.user.id);
    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: event,
    });
  } catch (error) {
    if (error.statusCode) res.status(error.statusCode);
    next(error);
  }
});

const deleteEvent = asyncHandler(async (req, res, next) => {
  try {
    await eventService.deleteEvent(req.params.id, req.user.id);
    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    if (error.statusCode) res.status(error.statusCode);
    next(error);
  }
});

const searchEvents = asyncHandler(async (req, res, next) => {
  try {
    const events = await eventService.searchEvents(req.query);
    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  searchEvents,
};
