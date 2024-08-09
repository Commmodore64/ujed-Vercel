const express = require('express');
const router = express.Router();
const connection = require('../db');

router.post('/validar-codigo', (req, res) => {
    const { codigo, id } = req.body;
  
    // Consulta a la base de datos filtrando por materia y código
    const query = 'SELECT * FROM cursos WHERE codigo = ? AND id = ?';
    connection.query(query, [codigo, id], (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ valido: false });
      }
  
      // Verifica si se encontró el código para la materia
      const esValido = results.length > 0;
      res.status(200).json({ valido: esValido });
    });
  });

module.exports = router;