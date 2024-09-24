const express = require("express");
const router = express.Router();
const db = require("../db");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

router.post("/generate-pdf-efectivo", (req, res) => {
  const {
    nombreCompleto,
    telefono,
    costo,
    curso, // Este es el nombre del curso
    catalogo,
  } = req.body;

  // Verificar que los datos requeridos están presentes
  if (!nombreCompleto || !telefono || !costo || !curso || !catalogo) {
    return res.status(400).json({ error: "Faltan datos para generar el PDF" });
  }

  // Buscar el programa por nombre del curso
  db.query("SELECT programa FROM cursos WHERE nombre = ?", [curso], (err, results) => {
    if (err) {
      console.error("Error al consultar la base de datos:", err);
      return res.status(500).json({ error: "Error al consultar la base de datos" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Curso no encontrado" });
    }

    const { programa } = results[0];

    // Obtener la fecha actual para el adeudo
    const fechaActual = new Date();
    const formatDate = `${fechaActual.getFullYear()}${String(fechaActual.getMonth() + 1).padStart(2, '0')}${String(fechaActual.getDate()).padStart(2, '0')}`;
    const formatTime = `${String(fechaActual.getHours()).padStart(2, '0')}${String(fechaActual.getMinutes()).padStart(2, '0')}`;

    // Obtener el siguiente ID_Adeudo (suponiendo que es autoincremental)
    db.query("SELECT MAX(ID_Adeudo) AS maxId FROM adeudos", (err, idResults) => {
      if (err) {
        console.error("Error al consultar el ID_Adeudo:", err);
        return res.status(500).json({ error: "Error al consultar el ID_Adeudo" });
      }

      const nextId = idResults[0].maxId ? idResults[0].maxId + 1 : 1; // Siguiente ID_Adeudo
      const referencia = `${nextId}${formatDate}${formatTime}`; // Generar referencia sin caracteres especiales

      // Insertar el adeudo en la base de datos con la referencia generada
      const adeudoData = {
        Matricula: '', // O el campo que uses para la matrícula
        Descripcion: catalogo,
        Monto: costo,
        Fecha_Adeudo: formatDate,
        Pagado: 0, // 0 significa no pagado
        Referencia: referencia // Incluir la referencia aquí
      };

      db.query("INSERT INTO adeudos SET ?", adeudoData, (err) => {
        if (err) {
          console.error("Error al insertar el adeudo:", err);
          return res.status(500).json({ error: "Error al insertar el adeudo" });
        }

        // Crear un documento PDF con tamaño personalizado
        const doc = new PDFDocument({
          size: [600, 300], // Dimensiones para la papeleta de pago
          margins: { top: 10, bottom: 10, left: 10, right: 10 }, // Márgenes pequeños para aprovechar mejor el espacio
        });
        const now = new Date();

        // Nombre del archivo PDF temporal
        const filePath = path.join(__dirname, `recibo_pago_${now.getTime()}.pdf`);

        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Agregar una imagen al PDF (logotipo o lo que necesites)
        const imagePath = path.join(__dirname, '../../img/logo-faeo.png');
        doc.image(imagePath, 20, 10, { width: 50 }); // Ajusta la posición y el tamaño de la imagen
        const imagePath2 = path.join(__dirname, '../../img/BBVA_2019.svg.png');
        doc.image(imagePath2, 500, 10, { width: 50 });

        // Agregar contenido al PDF
        doc.fontSize(20).text(programa, { align: "center" });
        doc.moveDown(1.5);
        doc.moveTo(20, doc.y).lineTo(580, doc.y).stroke();
        doc.moveDown(0.5);
        doc.fontSize(10);
        doc.text(`Nombre del Alumno(a): ${nombreCompleto}`).moveDown(0.5);
        doc.moveTo(20, doc.y).lineTo(580, doc.y).stroke();
        doc.moveDown(1.5);

        // Incluir fecha y hora de pago
        doc.moveUp(0.5);
        doc.text(`Fecha de pago: ${formatDate}`).moveDown(0.5);
        doc.text(`Hora de pago: ${formatTime}`).moveDown(0.5);
        doc.text(`Concepto: ${catalogo}`).moveDown(0.5);
        doc.text(`Teléfono: ${telefono}`).moveDown(0.5);
        doc.text(`Curso: ${curso}`).moveDown(0.5);
        doc.moveTo(20, doc.y).lineTo(580, doc.y).stroke();
        doc.moveDown(0.5);

        // Método de pago y monto en la misma línea
        doc.text(`Método de pago: Efectivo`, 20);
        doc.text(`Monto: $${costo}`, 400);
        doc.moveDown(0.5);
        doc.moveTo(20, doc.y).lineTo(580, doc.y).stroke();
        doc.moveDown(0.5);

        // Incluir la referencia en el PDF
        doc.text(`Referencia: ${referencia}`, { align: "left" }); // Mostrar la referencia en el PDF

        // Mensaje de agradecimiento
        doc.fontSize(10).text("Gracias por su pago.", { align: "center" });

        // Finalizar el documento
        doc.end();

        stream.on("finish", () => {
          res.sendFile(filePath, (err) => {
            if (err) {
              console.error("Error al enviar el archivo PDF:", err);
              return res.status(500).json({ error: "Error al enviar el archivo PDF" });
            }

            // Eliminar el archivo temporal después de enviarlo
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error("Error al eliminar el archivo temporal:", err);
              }
            });
          });
        });
      });
    });
  });
});

module.exports = router;
