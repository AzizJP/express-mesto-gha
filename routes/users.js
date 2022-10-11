const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatarById,
  getUserMe,
} = require('../controllers/users');
const { validateUserId, validateUserUpdate, validateAvatarUpdate } = require('../middlewares/validations');

router.get('/users', getUsers);
router.get('/users/me', getUserMe);
router.get('/users/:userId', validateUserId, getUserById);
router.patch('/users/me', validateUserUpdate, updateUser);
router.patch('/users/me/avatar', validateAvatarUpdate, updateAvatarById);

module.exports = router;
