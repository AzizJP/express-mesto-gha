const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatarById,
  getUserMe,
} = require('../controllers/users');
const validateAvatarUpdate = require('../middlewares/validateAvatarUpdate');
const validateUserUpdate = require('../middlewares/validateUserUpdate');

router.get('/users', getUsers);
router.get('/users/me', getUserMe);
router.get('/users/:userId', getUserById);
router.patch('/users/me', validateUserUpdate, updateUser);
router.patch('/users/me/avatar', validateAvatarUpdate, updateAvatarById);

module.exports = router;
