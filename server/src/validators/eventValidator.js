const { check, validationResult } = require('express-validator');

const validateEvent = [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('college', 'College is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  check('date', 'Please provide a valid date').isISO8601(),
  check('venue', 'Venue is required').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => ({ field: err.path, message: err.msg }))
      });
    }
    next();
  }
];

module.exports = { validateEvent };
