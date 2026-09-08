const asyncHandler = require('../utils/asyncHandler');
const registrationService = require('../services/registrationService');

const registerForEvent = asyncHandler(async (req, res, next) => {
  try {
    const registration = await registrationService.registerForEvent(req.params.id, req.user.id);
    res.status(201).json({
      success: true,
      message: 'Registered for event successfully',
      data: registration,
    });
  } catch (error) {
    if (error.statusCode) res.status(error.statusCode);
    next(error);
  }
});

const getEventRegistrations = asyncHandler(async (req, res, next) => {
  try {
    const registrations = await registrationService.getEventRegistrations(req.params.id, req.user.id);
    res.status(200).json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    if (error.statusCode) res.status(error.statusCode);
    next(error);
  }
});

module.exports = {
  registerForEvent,
  getEventRegistrations,
};
