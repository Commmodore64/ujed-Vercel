const express = require('express');
const router = express.Router();
const connection = require('../db');

// Obtener todos los pagos
router.get('/pagos', (req, res) => {
    connection.query('SELECT * FROM pagos', (err, results) => {
        if (err) {
            console.error('Error al obtener pagos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json(results);
    });
});

// Obtener un pago por ID_Pago
router.get('/pagos/:id_pago', (req, res) => {
    const idPago = req.params.id_pago;

    connection.query('SELECT * FROM pagos WHERE ID_Pago = ?', [idPago], (err, results) => {
        if (err) {
            console.error('Error al obtener el pago:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        
        // Si no se encuentra un pago con ese ID, devolver un 404
        if (results.length === 0) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }

        res.status(200).json(results[0]);
    });
});

module.exports = router;
