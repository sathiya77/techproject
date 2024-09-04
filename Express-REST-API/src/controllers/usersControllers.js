const fs = require('fs');
const path = require('path');
const cache = require('../../utils/cache');

const dataFilePath = path.join(__dirname, '../data/data.json');

// Helper function to read data
function readData() {
  if (cache.has('users')) {
    return cache.get('users');
  }
  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  cache.set('users', data);
  return data;
}

const getUsers = (req, res) => {
  const users = readData();
  res.status(200).json(users);
};

const searchUsers = (req, res) => {
  const { q } = req.query;
  const users = readData().filter((user) => user.name.includes(q));
  res.status(200).json(users);
};

const sortUsers = (req, res) => {
  const { sortBy } = req.query;
  const users = readData().sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
  res.status(200).json(users);
};

const paginateUsers = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const users = readData();
  const paginatedUsers = users.slice((page - 1) * limit, page * limit);
  res.status(200).json(paginatedUsers);
};

const filterUsers = (req, res) => {
  const { key, value } = req.query;
  const users = readData().filter((user) => user[key] === value);
  res.status(200).json(users);
};

module.exports = {
  getUsers,
  searchUsers,
  sortUsers,
  paginateUsers,
  filterUsers,
};
