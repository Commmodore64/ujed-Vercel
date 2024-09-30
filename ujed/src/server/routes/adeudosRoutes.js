const express = require('express');
const router = express.Router();
const connection = require('../db');

router.get('/adeudos/:id', (req, res) => {
    const ID_Adeudo = req.params.id;
    const query = 'SELECT * FROM adeudos WHERE ID_Adeudo = ?';
    connection.query(query, [ID_Adeudo], (err, results) => {
        if (err) {
            console.error('Error al obtener las inscripciones:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json(results);
    });
});

router.get('/adeudos', (req, res) => {
    const query = 'SELECT * FROM adeudos';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los adeudos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;