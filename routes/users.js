const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatarById,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatarById);

module.exports = router;
