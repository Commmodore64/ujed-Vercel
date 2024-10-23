const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const connection = require('../db');

// Middleware para parsear JSON
router.use(bodyParser.json());

// Función para guardar o actualizar los detalles en la base de datos
async function guardarDetalles(reference, nombre, descripcion, monto, fechaAdeudo, id_alumno) {
    // Primero intentamos actualizar el registro
    const updateQuery = 'UPDATE adeudos SET referencia = ?, Nombre = ?, Descripcion = ?, monto = ?, Fecha_Adeudo = ? WHERE id_alumno = ? AND Descripcion = ?';
    
    connection.query(updateQuery, [reference, nombre, descripcion, monto, fechaAdeudo, id_alumno, descripcion], (err, results) => {
        if (err) {
            console.error('Error al actualizar los detalles del pago:', err);
            return;
        }
        
        if (results.affectedRows > 0) {
            console.log(`Detalles del pago actualizados para matrícula: ${id_alumno}, Descripción: ${descripcion}`);
        } else {
            // Si no se actualizó nada, insertamos un nuevo registro
            const insertQuery = 'INSERT INTO adeudos (referencia, Nombre, Descripcion, monto, Fecha_Adeudo, id_alumno) VALUES (?, ?, ?, ?, ?, ?)';
            connection.query(insertQuery, [reference, nombre, descripcion, monto, fechaAdeudo, id_alumno], (insertErr) => {
                if (insertErr) {
                    console.error('Error al guardar los detalles del pago:', insertErr);
                } else {
                    console.log(`Detalles del pago guardados: Referencia: ${reference}, Nombre: ${nombre}, Descripción: ${descripcion}, Monto: ${monto}, Fecha: ${fechaAdeudo}`);
                }
            });
        }
    });
}

// Función para extraer el nombre del `order_id`
function extraerNombre(orderId) {
    const partes = orderId.split('_');
    if (partes.length >= 2) {
        return partes[1]; // Tomamos la parte después del primer guión bajo como nombre
    }
    return ''; // Si no tiene el formato esperado, devolvemos un string vacío
}

// Endpoint para recibir notificaciones de OpenPay
router.post('/webhook/openpay', async (req, res) => {
    console.log("Cuerpo de la solicitud recibida:", JSON.stringify(req.body, null, 2)); // Log completo del cuerpo

    const eventType = req.body.type;

    if (eventType === 'verification') {
        console.log('Evento de verificación recibido:', req.body.verification_code);
        res.status(200).send('Verificación completada');
    } else if (eventType === 'charge.created') {
        const paymentData = req.body.transaction;

        if (paymentData) {
            const orderId = paymentData.order_id; // Obtener el order_id
            const description = paymentData.description || '';
            const amount = paymentData.amount || 0; // Monto de la transacción
            const fechaAdeudo = paymentData.creation_date || ''; // Fecha de creación

            let reference = '';
            let nombre = '';

            // Verificamos el tipo de método de pago y extraemos la referencia
            if (paymentData.payment_method.type === 'store') {
                reference = paymentData.payment_method.reference; // En store la referencia está en payment_method.reference
            } else if (paymentData.payment_method.type === 'bank_transfer') {
                reference = paymentData.payment_method.name; // En bank_transfer está en payment_method.name
            }

            if (orderId) {
                nombre = extraerNombre(orderId); // Extraemos el nombre del order_id
                const id_alumno = orderId.split('_')[3]; // Extraemos la matrícula del order_id
                console.log(`Buscando adeudo con matrícula: ${id_alumno} y descripción: ${description}`);

                // Consulta para buscar en la tabla adeudos
                const query = 'SELECT * FROM adeudos WHERE id_alumno = ? AND Descripcion = ?';
                connection.query(query, [id_alumno, description], async (err, results) => {
                    if (err) {
                        console.error('Error al buscar en la tabla adeudos:', err);
                        return res.status(500).send('Error interno al buscar en adeudos');
                    }

                    if (results.length > 0) {
                        // Si se encuentra una coincidencia, guardamos los detalles
                        guardarDetalles(reference, nombre, description, amount, fechaAdeudo, id_alumno);
                        res.status(200).send('Webhook procesado y datos guardados');
                    } else {
                        console.log('No se encontró coincidencia en la tabla adeudos');
                        res.status(400).send('No se encontró el adeudo correspondiente');
                    }
                });
            } else {
                console.log('Referencia o nombre no encontrados en los datos del pago');
                res.status(400).send('Datos incompletos');
            }
        } else {
            console.log('Datos no recibidos correctamente');
            res.status(400).send('Datos no recibidos');
        }
    } else if (eventType === 'charge.succeeded' || eventType === 'charge.failed' || eventType === 'spei.received') {
        const paymentData = req.body.transaction;

        if (paymentData) {
            const reference = paymentData.order_id || paymentData.reference;
            const status = paymentData.status;

            if (reference && status) {
                actualizarEstado(reference, status);
                res.status(200).send('Webhook procesado');
            } else {
                console.log('Referencia o estado no encontrados en los datos del pago');
                res.status(400).send('Datos incompletos');
            }
        } else {
            console.log('Datos no recibidos correctamente');
            res.status(400).send('Datos no recibidos');
        }
    } else {
        console.log('Evento no manejado:', eventType);
        res.status(400).send('Evento no manejado');
    }
});

module.exports = router;
