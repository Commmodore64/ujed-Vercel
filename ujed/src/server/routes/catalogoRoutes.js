const express = require('express');
const router = express.Router();
const connection = require('../db');

// Crear un nuevo catalogos
router.post('/catalogo', (req, res) => {
    //const { nombre, programa, info, costo, vigencia, cupo, codigo } = req.body;

    const query = 'INSERT INTO catalogo_conceptos (cuenta, nombre_cuenta, subcuenta, tipo_poliza, llave_concepto, concepto) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [cuenta, nombre_cuenta, subcuenta, tipo_poliza, llave_concepto, concepto], (err, results) => {
        if (err) {
            console.error('Error al crear el catalogo:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(201).json({ id: results.insertId, cuenta, nombre_cuenta, subcuenta, tipo_poliza, llave_concepto, concepto });
        console.log("Catalogo creado correctamente, datos: ", { id: results.insertId, cuenta, nombre_cuenta, subcuenta, tipo_poliza, llave_concepto, concepto });
    });
});


// Endpoint para obtener todos los catalogos
router.get('/catalogo', (req, res) => {
    connection.query('SELECT * FROM catalogo_conceptos', (err, results) => {
      if (err) {
        console.error('Error al obtener el catalogo:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      res.status(200).json(results);
    });
  });

// Obtener un curso por ID
// router.get('/cursos/:id', (req, res) => {
//     const cursoId = req.params.id;
//     const query = 'SELECT * FROM cursos WHERE id = ?';
//     connection.query(query, [cursoId], (err, results) => {
//         if (err) {
//             console.error('Error al obtener el curso:', err);
//             return res.status(500).json({ error: 'Error interno del servidor' });
//         }
//         if (results.length > 0) {
//             res.status(200).json(results[0]);
//         } else {
//             res.status(404).json({ error: 'Curso no encontrado' });
//         }
//     });
// });

// Actualizar un catalogo por ID
router.put('/catalogo/:id', (req, res) => {
    const catalogoId = req.params.id;
    const { cuenta, nombre_cuenta, subcuenta, tipo_poliza, llave_concepto, concepto } = req.body;

    console.log('Datos recibidos:', { cuenta, nombre_cuenta, subcuenta, tipo_poliza, llave_concepto, concepto });

    const query = 'UPDATE catalogo_conceptos SET cuenta = ?, nombre_cuenta = ?, subcuenta = ?, tipo_poliza = ?, llave_concepto = ?, concepto = ? WHERE id = ?';
    connection.query(query, [cuenta, nombre_cuenta, subcuenta, tipo_poliza, tipo_poliza, llave_concepto, concepto, catalogoId ], (err, results) => {
        if (err) {
            console.error('Error al actualizar del catalogo:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json({ id: cursoId, nombre, info });
    });
});



// Eliminar un curso por ID
router.delete('/catalogo/:id', (req, res) => {
    const cursoId = req.params.id;
    const query = 'DELETE FROM catalogo_conceptos WHERE id = ?';
    connection.query(query, [cursoId], (err, results) => {
        if (err) {
            console.error('Error al eliminar el catalogo:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(204).json({ message: 'Catalogo eliminado' });
    });
});

module.exports = router;