const express = require('express');
const router = express.Router();
const connection = require('../db');
const cors = require('cors');
router.use(cors());

// Ruta para guardar o actualizar datos del alumno
router.post('/userdata', (req, res) => {
    const { matricula, nombre_completo, telefono, email, fecha_nacimiento, id } = req.body;
    console.log('Datos del alumno:', req.body);

    // Verificar si el correo ya existe en la base de datos
    connection.query(
        'SELECT * FROM alumnos WHERE email = ?',
        [email],
        (err, results) => {
            if (err) {
                console.error('Error al buscar alumno:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }

            if (results.length > 0) {
                // Si el alumno ya existe, actualizar los datos
                connection.query(
                    'UPDATE alumnos SET matricula = ?, nombre_completo = ?, telefono = ?, fecha_nacimiento = ?, id= ? WHERE email = ?',
                    [matricula, nombre_completo, telefono, fecha_nacimiento, id,  email],
                    (err, results) => {
                        if (err) {
                            console.error('Error al actualizar alumno:', err);
                            return res.status(500).json({ error: 'Error al actualizar alumno' });
                        }
                        res.status(200).json({ message: 'Datos del alumno actualizados correctamente' });
                    }
                );
            } else {
                // Si el alumno no existe, insertar un nuevo registro
                connection.query(
                    'INSERT INTO alumnos (matricula, nombre_completo, telefono, fecha_nacimiento, id, email) VALUES (?, ?, ?, ?, ?, ?)',
                    [matricula, nombre_completo, telefono, fecha_nacimiento,id, email],
                    console.log("Alumno creado correctamente, datos: ", matricula, nombre_completo, telefono, fecha_nacimiento,id, email),
                    (err, results) => {
                        if (err) {
                            console.error('Error al insertar nuevo alumno:', err);
                            return res.status(500).json({ error: 'Error al insertar nuevo alumno' });
                        }
                        res.status(200).json({ message: 'Nuevo alumno registrado correctamente' });
                    }
                );
            }
        }
    );
});

module.exports = router;
