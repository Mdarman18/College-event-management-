const asyncHandler = require('../utils/asyncHandler');
const userService = require('../services/userService');

const getProfile = asyncHandler(async (req, res, next) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode);
    }
    next(error);
  }
});

module.exports = {
  getProfile,
};
