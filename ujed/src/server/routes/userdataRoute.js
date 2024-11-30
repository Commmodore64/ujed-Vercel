const express = require("express");
const router = express.Router();
const connection = require("../db");
const cors = require("cors");
router.use(cors());

// Ruta para guardar o actualizar datos del alumno
router.post("/userdata", (req, res) => {
  const { matricula, nombre_completo, telefono, email, fecha_nacimiento, id } =
    req.body;
  console.log("Datos del alumno req.body:", req.body);

  // Verificar si el correo ya existe en la base de datos
  connection.query(
    "SELECT * FROM alumnos WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("Error al buscar alumno:", err);
        return res.status(500).json({ error: "Error interno del servidor" });
      }

      if (results.length > 0) {
        // Alumno encontrado
        const alumno = results[0];
        const fecha_nacimientoSQL = new Date(alumno.fecha_nacimiento)
          .toISOString()
          .split("T")[0];
        console.log("Datos MySQL alumno:", alumno);

        // Verificar si los datos han cambiado
        if (
          alumno.matricula === matricula &&
          alumno.nombre_completo === nombre_completo &&
          alumno.telefono === telefono &&
          fecha_nacimientoSQL === fecha_nacimiento &&
          alumno.id === id
        ) {
          console.log("No hubo cambios en los datos del alumno");
          return res
            .status(200)
            .json({ message: "No hubo cambios en los datos del alumno" });
        }

        // Si los datos han cambiado, actualizar los datos
        console.log("Alumno encontrado, actualizando datos");
        connection.query(
          "UPDATE alumnos SET matricula = ?, nombre_completo = ?, telefono = ?, fecha_nacimiento = ?, id = ? WHERE email = ?",
          [matricula, nombre_completo, telefono, fecha_nacimiento, id, email],
          (err, results) => {
            if (err) {
              console.error("Error al actualizar alumno:", err);
              return res
                .status(500)
                .json({ error: "Error al actualizar alumno" });
            }
            res
              .status(200)
              .json({ message: "Datos del alumno actualizados correctamente" });
          }
        );
      } else {
        // Si el alumno no existe, insertar un nuevo registro
        console.log("Alumno no encontrado, creando nuevo registro");
        connection.query(
          "INSERT INTO alumnos (matricula, nombre_completo, telefono, fecha_nacimiento, id, email) VALUES (?, ?, ?, ?, ?, ?)",
          [matricula, nombre_completo, telefono, fecha_nacimiento, id, email],
          (err, results) => {
            if (err) {
              console.error("Error al insertar nuevo alumno:", err);
              return res
                .status(500)
                .json({ error: "Error al insertar nuevo alumno" });
            }
            res
              .status(200)
              .json({ message: "Nuevo alumno registrado correctamente" });
          }
        );
      }
    }
  );
});

module.exports = router;
