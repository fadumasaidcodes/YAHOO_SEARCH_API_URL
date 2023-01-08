const express = require('express');
const app = express();

// Set up EJS as the template engine
app.set('view engine', 'ejs');

// An array of users for the API
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' },
  { id: 4, name: 'Faduma' },
  { id: 5, name: 'fahad' }
];

// API endpoints

// Returns a list of users
app.get('/users', (req, res) => {
  res.json(users);
});

// Returns a user with the specified id
app.get('/users/:id', (req, res, next) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) return next(new Error('User not found'));
  res.json(user);
});

// Adds a new user to the list of users
app.post('/users', (req, res) => {
  const user = { id: Date.now(), name: req.body.name };
  users.push(user);
  res.json(user);
});

// Render the index template
app.get('/', (req, res) => {
  res.render('index', { title: 'My API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
