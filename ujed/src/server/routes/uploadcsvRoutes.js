const express = require('express');
const router = express.Router();
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const connection = require('../db');

const upload = multer({ dest: 'uploads/' }); // Carpeta para almacenar archivos subidos

// Ruta para procesar el archivo CSV
router.post('/subir-archivo', upload.single('file'), (req, res) => {
  const results = [];

  // Leer el archivo CSV
  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on('data', (data) => {
      // Formatear la fecha de 'DD-MM-YYYY' a 'YYYY-MM-DD'
      const fechaPagoFormatted = new Date(data.Dia.split('-').reverse().join('-')).toISOString().split('T')[0]; // Cambia 'Dia' a 'Fecha_Pago'
      results.push({
        fechaPago: fechaPagoFormatted, // Cambiado a 'Dia'
        referencia: data.Referencia // Asegúrate de que este nombre coincide con la columna en el CSV
      });
    })
    .on('end', () => {
      // Procesar cada registro del CSV
      const queries = results.map(({ fechaPago, referencia }) => {
        return new Promise((resolve, reject) => {
          const query = `
            UPDATE adeudos
            SET Fecha_Pago = ?, Pagado = 1
            WHERE referencia = ?
          `;

          connection.query(query, [fechaPago, referencia], (err, results) => {
            if (err) {
              console.error('Error al actualizar el pago:', err);
              return reject(err);
            }
            console.log(`Ejecutando query: ${query}`);
            console.log(`Resultados de la consulta: ${JSON.stringify(results)}`); // Log para depuración
            if (results.affectedRows === 0) {
              console.log(`Referencia no encontrada: ${referencia}`);
            }
            resolve();
          });
        });
      });

      // Ejecutar todas las consultas
      Promise.all(queries)
        .then(() => {
          res.status(200).json({ message: 'Pagos actualizados exitosamente' });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Error al procesar los pagos' });
        })
        .finally(() => {
          fs.unlinkSync(req.file.path); // Eliminar el archivo después de procesar
        });
    });
});

module.exports = router;
