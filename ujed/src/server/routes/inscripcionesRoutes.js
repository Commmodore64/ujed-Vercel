const express = require('express');
const router = express.Router();
const connection = require('../db');

router.post('/inscripciones', (req, res) => {
    const fecha = new Date();
    const { id_curso, nombre } = req.body;
    const query = 'INSERT INTO inscripciones (id_curso, nombre, fecha_inscripcion) VALUES (?, ?, ?)';
    connection.query(query, [id_curso, nombre, fecha], (err, results) => {
        if (err) {
            console.error('Error al inscribir el usuario:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(201).json({ id: results.insertId, cursoId, userId });
        console.log("Usuario inscrito correctamente, datos: ", { id: results.insertId, cursoId, userId});
    });
});

router.get('/inscripciones/:id', (req, res) => {
    const cursoId = req.params.id;
    const query = 'SELECT * FROM inscripciones WHERE id_curso = ?';
    connection.query(query, [cursoId], (err, results) => {
        if (err) {
            console.error('Error al obtener las inscripciones:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json(results);
    });
  });
router.get('/inscripciones', (req, res) => {
    const query = 'SELECT * FROM inscripciones';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener las inscripciones:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json(results);
    });
});

  module.exports = router;