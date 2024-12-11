const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let users = [];

// Crear un nuevo usuario
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Obtener todos los usuarios
app.get('/users', (req, res) => {
    res.json(users);
});

// Obtener un usuario por ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("Usuario no encontrado");
    res.json(user);
});

// Actualizar un usuario por ID
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("Usuario no encontrado");

    // Actualizamos los datos del usuario
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    res.json(user);
});

// Eliminar un usuario por ID
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.status(204).send();
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

