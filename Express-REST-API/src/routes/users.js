const express = require('express');
const {
  getUsers,
  searchUsers,
  sortUsers,
  paginateUsers,
  filterUsers,
} = require('../controllers/usersControllers');

const router = express.Router();

router.get('/', getUsers);
router.get('/search', searchUsers);
router.get('/sort', sortUsers);
router.get('/paginate', paginateUsers);
router.get('/filter', filterUsers);

module.exports = router;
