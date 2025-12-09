const fs = require('fs');
const data = require('../data.json');

function save() {
  fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
}

exports.getTasks = (req, res) => {
  const { status } = req.query;
  if (status)
    return res.json(data.tasks.filter(t => t.status === status));

  res.json(data.tasks);
};

exports.getTaskById = (req, res) => {
  const task = data.tasks.find(t => t.id == req.params.id);
  task ? res.json(task) : res.status(404).json({ error: "Not found" });
};

exports.createTask = (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    status: req.body.status || "todo" // <- теперь можно указать статус при создании
  };
  data.tasks.push(newTask);
  save();
  res.status(201).json(newTask);
};


exports.updateTask = (req, res) => {
  const task = data.tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ error: "Not found" });

  // обновление title и status
  task.title = req.body.title ?? task.title;
  task.status = req.body.status ?? task.status;  // <- новое
  save();
  res.json(task);
};


exports.deleteTask = (req, res) => {
  const index = data.tasks.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  data.tasks.splice(index, 1);
  save();
  res.json({ message: "Deleted" });
};
