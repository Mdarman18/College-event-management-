const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  searchEvents,
} = require('../controllers/eventController');
const {
  registerForEvent,
  getEventRegistrations,
} = require('../controllers/registrationController');
const { protect } = require('../middleware/auth');
const { validateEvent } = require('../validators/eventValidator');

router.get('/search', searchEvents);
router.route('/')
  .get(getEvents)
  .post(protect, validateEvent, createEvent);

router.route('/:id')
  .get(getEventById)
  .put(protect, validateEvent, updateEvent)
  .delete(protect, deleteEvent);

router.post('/:id/register', protect, registerForEvent);
router.get('/:id/registrations', protect, getEventRegistrations);

module.exports = router;
