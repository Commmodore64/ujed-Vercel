const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ejemplo de ruta para obtener todos los usuarios
router.get('/alumnos', (req, res) => {
  connection.query('SELECT * FROM Alumnos', (err, results) => {
    if (err) {
      console.error('Error fetching users: ', err);
      res.status(500).json({ error: 'Error fetching users' });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
