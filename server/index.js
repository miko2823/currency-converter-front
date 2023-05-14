const express = require('express');
const cors = require('cors');

const PORT = 3002;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const users = [
  { id: 'admin', password: 'pass', name: 'Admin', isAdmin: true },
  { id: 'apple', password: 'pass', name: 'Apple', isAdmin: false },
  { id: 'banana', password: 'pass', name: 'Banana', isAdmin: false },
  { id: 'carrot', password: 'pass', name: 'Carrot', isAdmin: false },
];

app.get('/get_user', (req, res) => {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ message: 'IDエラーです。' });
  }

  const data = users.find((user) => user.id === id);

  if (!data) {
    res.status(400).json({ message: 'IDエラーです。' });
  }

  setTimeout(() => {
    res.json(data);
  }, 1000);
});

app.post('/login', (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    res.status(400).json({ message: 'ID、またはパスワードを入力してください。' });
  }

  const matchedUser = users.find((user) => user.id === id);

  if (!matchedUser || matchedUser.password !== password) {
    res.status(400).json({ message: 'ID、またはパスワードに誤りがあります。' });
  }

  res.json({ token: 'token' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
