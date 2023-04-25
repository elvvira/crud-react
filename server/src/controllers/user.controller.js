const path = require('path');
const fs = require('fs');
const usersFile = path.resolve(__dirname, '../../data/user.json');
// const { v4 } = require('uuid');

const controller = {};

controller.allUsers = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err)
      return res.status(500).send({ message: 'Error al leer el archivo' });
    const jsonData = JSON.parse(data);
    res.send(jsonData);
    console.log(jsonData);
  });
};
controller.usersById = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err)
      return res.status(500).send({ message: 'Error al leer el archivo' });
    const jsonData = JSON.parse(data);
    const userIdSelect = jsonData.find(user => {
      return user.userId === req.params.id;
    });
    res.send(userIdSelect);
  });
};
controller.createUser = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err)
      return res.status(500).send({ message: 'Error al leer el archivo' });
    const jsonData = JSON.parse(data);

    const userCheck = jsonData.some(user => {
      return user.email === req.body.email;
    });

    if (userCheck) {
      return res.status(409).send({ message: 'Conflicto al crear' });
    }

    const newInfo = req.body;
    newInfo.userId = v4();

    jsonData.push(newInfo);

    fs.writeFile(usersFile, JSON.stringify(jsonData), err => {
      if (err) return res.status(500).send({ message: 'error' });
      res.end();
    });
  });
};

module.exports = controller;
