const express = require('express');
const router = express.Router();
const https = require('https'); // Para hacer solicitudes HTTPS
const db = require('../db'); // Para interactuar con la base de datos

const PRIVATE_API_KEY = 'sk_5dc3b0f5aab6451795796e4698223287'; // Reemplaza con tu clave API privada
const MERCHANT_ID = 'mubvsyjaue0v90vbd5r8'; // Reemplaza con tu Merchant ID



// Función para obtener el id del curso basado en el nombre del curso
const getCursoIdByName = (curso) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id FROM cursos WHERE nombre = ?';
    db.query(query, [curso], (error, results) => {
      if (error) return reject(error);
      if (results.length > 0) {
        resolve(results[0].id);
      } else {
        resolve(null); // O podrías rechazar la promesa si prefieres
      }
    });
  });
};

// Función para insertar un registro en la tabla inscripciones
const insertInscripcion = (idCurso, nombre, fechaInscripcion, estadoPago) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO inscripciones (id_curso, nombre, fecha_inscripcion, estado_pago) VALUES (?, ?, ?, ?)';
    const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato YYYY-MM-DD HH:MM:SS
    db.query(query, [idCurso, nombre, fechaActual, estadoPago], (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Endpoint para crear un checkout
router.post('/create-checkout', async (req, res) => {
  const { amount, currency, newDescription, order_id, send_email, customer, redirect_url, curso } = req.body;

  // Verificar que todos los campos requeridos están presentes
  if (!amount || !currency || !newDescription || !order_id || !redirect_url || !customer || !curso) {
    return res.status(400).json({ error: 'Todos los campos requeridos deben ser proporcionados' });
  }

  try {
    // Obtener el id del curso basado en el nombre del curso
    const cursoId = await getCursoIdByName(curso);

    if (!cursoId) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    // Log del id del curso para corroborar
    console.log('ID del curso:', cursoId);

    // Crear el nombre completo del cliente
    const nombreCompleto = `${customer.name}`;

    // Insertar en la tabla inscripciones
    await insertInscripcion(cursoId, nombreCompleto, new Date().toISOString().slice(0, 19).replace('T', ' '), 'Pendiente');

    const description = `${newDescription}-${cursoId}`;

    const postData = JSON.stringify({
      amount,
      currency,
      description,
      order_id,
      send_email,
      customer: {
        name: customer.name,
        email: customer.email,
        phone_number: customer.phone_number,
      },
      redirect_url,
    });

    const options = {
      hostname: 'sandbox-api.openpay.mx',
      port: 443,
      path: `/v1/${MERCHANT_ID}/checkouts`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${PRIVATE_API_KEY}:`).toString('base64')}`,
        'Content-Length': Buffer.byteLength(postData), // Asegúrate de que el Content-Length es correcto
      },
    };

    const request = https.request(options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        if (response.statusCode === 200) {
          res.json(JSON.parse(data));
        } else {
          res.status(response.statusCode).json(JSON.parse(data));
        }
      });
    });

    request.on('error', (e) => {
      console.error('Error al crear el checkout:', e);
      res.status(500).json({ error: 'Error al crear el checkout' });
    });

    request.write(postData);
    console.log(postData);
    request.end();
  } catch (error) {
    console.error('Error al obtener id del curso o insertar inscripción:', error);
    res.status(500).json({ error: 'Error al obtener id del curso o insertar inscripción' });
  }
});
// Nueva ruta para verificar una transacción y guardarla en la base de datos
router.get('/verify-transaction', (req, res) => {
  const transactionId = req.query.id;

  if (!transactionId) {
    return res.status(400).json({ error: 'Falta el ID de la transacción' });
  }

  const options = {
    hostname: 'sandbox-api.openpay.mx',
    port: 443,
    path: `/v1/${MERCHANT_ID}/charges/${transactionId}`,
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${PRIVATE_API_KEY}:`).toString('base64')}`,
    },
  };

  const request = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      if (response.statusCode === 200) {
        const transactionData = JSON.parse(data);
        const status = transactionData.status;
        const holderName = transactionData.card ? transactionData.card.holder_name : 'Desconocido';
        const amount = transactionData.amount;
        const date = transactionData.operation_date;
        const accountNumber = transactionData.card ? transactionData.card.card_number : 'N/A';
        const method = transactionData.method;
        const description = transactionData.description;
        const orderId = transactionData.order_id;
        const name = orderId.split('_')[1];

        // Extraer el número después del guion en la descripción
        const descriptionNumber = description.split('-')[1]?.trim();

        // Insertar datos en la tabla de pagos si la transacción se completó
        if (status === 'completed') {
          const insertQuery = `
            INSERT INTO pagos (Nombre_usuario, Nombre, Monto, Fecha_Pago, Numero_Cuenta, Metodo_Pago, Descripcion) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
          const values = [name, holderName, amount, date, accountNumber, method, description];

          db.query(insertQuery, values, (err, result) => {
            if (err) {
              console.error('Error al insertar en la base de datos:', err);
              return res.status(500).json({ error: 'Error al insertar en la base de datos' });
            }

            // Después de insertar en la tabla de pagos, actualizar la tabla de inscripciones
            const updateInscriptionQuery = `
              UPDATE inscripciones 
              SET estado_pago = 'Autorizado' 
              WHERE Nombre = ? AND id_curso = ?
            `;
            const inscriptionValues = [name, descriptionNumber];

            db.query(updateInscriptionQuery, inscriptionValues, (err, result) => {
              if (err) {
                console.error('Error al actualizar la inscripción:', err);
                return res.status(500).json({ error: 'Error al actualizar la inscripción' });
              }

              // Restar un cupo al curso correspondiente
              const updateCupoQuery = `
                UPDATE cursos
                SET cupo = cupo - 1
                WHERE id = ?
              `;
              db.query(updateCupoQuery, [descriptionNumber], (err, result) => {
                if (err) {
                  console.error('Error al actualizar el cupo del curso:', err);
                  return res.status(500).json({ error: 'Error al actualizar el cupo del curso' });
                }

                console.log(`Cupo actualizado y reducido en 1 para el curso con ID ${descriptionNumber}`);
                
                // Redirigir a la raíz del proyecto
                res.redirect('http://localhost:3000');
              });
            });
          });
        } else {
          console.log(`Pago no autorizado para ${holderName} o ${name}`);
          res.status(400).json({
            success: false,
            message: 'Pago no autorizado',
            data: transactionData,
          });
        }
      } else {
        res.status(response.statusCode).json(JSON.parse(data));
      }
    });
  });

  request.on('error', (e) => {
    console.error('Error al consultar la transacción:', e);
    res.status(500).json({ error: 'Error al consultar la transacción' });
  });

  request.end();
});





module.exports = router;
