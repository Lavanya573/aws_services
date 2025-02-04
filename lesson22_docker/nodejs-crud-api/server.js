
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // to parse JSON bodies

// In-memory data store
let users = [
  { id: 1, name: 'Asad', email: 'asad@gmail.com' },
  { id: 2, name: 'Saurabh', email: 'saurabh@gmail.com' },
  { id: 2, name: 'Kanishk', email: 'kanishk@gmail.com' }
];

// CREATE: Add a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// READ: Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// READ: Get user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// UPDATE: Modify user by ID
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { name, email } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;

  res.json(user);
});

// DELETE: Delete user by ID
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
