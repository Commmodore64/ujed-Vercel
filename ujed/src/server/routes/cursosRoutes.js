const express = require('express');
const router = express.Router();
const connection = require('../db');

// Crear un nuevo curso
router.post('/cursos', (req, res) => {
    const { nombre, info } = req.body;
    const fecha = new Date();
    const query = 'INSERT INTO cursos (nombre, info, date) VALUES (?, ?, ?)';
    connection.query(query, [nombre, info, fecha], (err, results) => {
        if (err) {
            console.error('Error al crear el curso:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(201).json({ id: results.insertId, nombre, info });
        console.log("Curso creado correctamente, datos: ", { id: results.insertId, nombre, info});
    });
});

// Endpoint para obtener todos los cursos
router.get('/cursos', (req, res) => {
    connection.query('SELECT * FROM cursos', (err, results) => {
      if (err) {
        console.error('Error al obtener cursos:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      res.status(200).json(results);
    });
  });

// Obtener un curso por ID
router.get('/cursos/:id', (req, res) => {
    const cursoId = req.params.id;
    const query = 'SELECT * FROM cursos WHERE id = ?';
    connection.query(query, [cursoId], (err, results) => {
        if (err) {
            console.error('Error al obtener el curso:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ error: 'Curso no encontrado' });
        }
    });
});

// Actualizar un curso por ID
router.put('/cursos/:id', (req, res) => {
    const cursoId = req.params.id;
    const { nombre, info } = req.body;
    const query = 'UPDATE cursos SET nombre = ?, info = ? WHERE id = ?';
    connection.query(query, [nombre, info, cursoId], (err, results) => {
        if (err) {
            console.error('Error al actualizar el curso:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json({ id: cursoId, nombre, info });
    });
});

// Eliminar un curso por ID
router.delete('/cursos/:id', (req, res) => {
    const cursoId = req.params.id;
    const query = 'DELETE FROM cursos WHERE id = ?';
    connection.query(query, [cursoId], (err, results) => {
        if (err) {
            console.error('Error al eliminar el curso:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(204).json({ message: 'Curso eliminado' });
    });
});

module.exports = router;
