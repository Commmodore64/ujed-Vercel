const express = require('express');
const router = express.Router();
const connection = require('../db');

router.get('/centroCosto/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM centroCosto WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener los centros de costos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json(results);
    });
});

router.get('/centroCosto', (req, res) => {
    const query = 'SELECT * FROM centroCosto';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los Centros de Costos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;