const express = require('express');
const router = express.Router();
const connection = require('../db');
const cors = require('cors');
router.use(cors());

// Ruta para guardar datos del usuario
router.post('/userdata', (req, res) => {
    const { email } = req.body; // Suponiendo que envías el correo electrónico del usuario desde React
    console.log('Correo electrónico del usuario:', email);
  
    const query = 'INSERT INTO usuarios (correo) VALUES (?)'; // Ajusta según tu esquema de base de datos
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.error('Error al guardar los datos del usuario:', err);
        res.status(500).json({ error: 'Error al guardar los datos del usuario' });
        return;
      }
      res.status(200).json({ message: 'Datos del usuario guardados correctamente' });
    });
  });

  module.exports = router;