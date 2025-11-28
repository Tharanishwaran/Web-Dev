const express = require('express');
const app = express();
app.use(express.json());
let todos = [ { id: 1, title: 'learn node', done: false } ];
app.get('/todos', (req, res) => res.json(todos));
app.post('/todos', (req, res) => {
  const todo = { id: Date.now(), title: req.body.title || '', done: false };
  todos.push(todo); res.status(201).json(todo);
});
app.listen(3002, () => console.log('Express on http://localhost:3002'));
