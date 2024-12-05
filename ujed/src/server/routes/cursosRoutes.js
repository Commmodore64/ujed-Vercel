const express = require("express");
const router = express.Router();
const pool = require("../db"); // Usamos pool en lugar de connection

// Crear un nuevo curso
router.post("/cursos", async (req, res) => {
  console.log("Datos recibidos:", req.body);

  const {
    nombre,
    programa,
    info,
    costo,
    vigencia,
    cupo,
    codigo,
    catalogo,
    centroCosto,
  } = req.body;

  // Validar el formato de la fecha (dd/MM/yyyy)
  const [day, month, year] = vigencia.split("/");
  if (!day || !month || !year) {
    return res.status(400).json({ error: "Formato de fecha incorrecto" });
  }

  const vigenciaFormat = `${year}-${month}-${day}`;
  const fecha = new Date().toISOString().split("T")[0];

  // Imprimir los datos para ver qué estamos enviando
  console.log("Datos a insertar:", [
    nombre,
    programa,
    info,
    fecha,
    costo,
    vigenciaFormat,
    cupo,
    codigo,
    catalogo,
    centroCosto,
  ]);

  const query =
    "INSERT INTO cursos (nombre, programa, info, date, costo, vigencia, cupo, codigo, catalogo, centroCosto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  try {
    // Realiza la consulta correctamente utilizando await
    const [results] = await pool.query(query, [
      nombre,
      programa,
      info,
      fecha,
      costo,
      vigenciaFormat,
      cupo,
      codigo,
      catalogo,
      centroCosto,
    ]);

    // Retornar la respuesta
    res.status(201).json({
      id: results.insertId,
      nombre,
      programa,
      info,
      costo,
      vigencia: vigenciaFormat,
      cupo,
      codigo,
      catalogo,
      centroCosto,
    });

    console.log("Curso creado correctamente:", {
      id: results.insertId,
      nombre,
      programa,
      info,
      costo,
      vigencia: vigenciaFormat,
      cupo,
      codigo,
      catalogo,
      centroCosto,
    });
  } catch (err) {
    console.error("Error al crear el curso:", err);
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: err.message });
  }
});

// Endpoint para obtener todos los cursos
router.get("/cursos", (req, res) => {
  pool.query("SELECT * FROM cursos", (err, results) => {
    if (err) {
      console.error("Error al obtener los cursos: ", err);
      res
        .status(500)
        .json({ error: "Error en la consulta a la base de datos" });
      return;
    }
    console.log("Cursos obtenidos: ", results);
    res.status(200).json(results); // Devuelve los resultados en formato JSON
  });
});

// Obtener un curso por ID
router.get("/cursos/:id", async (req, res) => {
  const cursoId = req.params.id;
  const query = "SELECT * FROM cursos WHERE id = ?";

  let connection;

  try {
    connection = await pool.getConnection();
    const [results] = await connection.query(query, [cursoId]);

    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ error: "Curso no encontrado" });
    }
  } catch (err) {
    console.error("Error al obtener el curso:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    if (connection) connection.release();
  }
});

// Actualizar un curso por ID
router.put("/cursos/:id", async (req, res) => {
  const cursoId = req.params.id;
  const fecha = new Date();
  const {
    nombre,
    programa,
    info,
    costo,
    vigencia,
    cupo,
    codigo,
    catalogo,
    centroCosto,
  } = req.body;

  console.log("Datos recibidos:", {
    nombre,
    programa,
    info,
    costo,
    vigencia,
    cupo,
    codigo,
    catalogo,
    centroCosto,
  });

  const query =
    "UPDATE cursos SET nombre = ?, programa = ?, info = ?, date = ?, costo = ?, vigencia = ?, cupo = ?, codigo = ?, catalogo = ?, centroCosto = ? WHERE id = ?";

  let connection;

  try {
    connection = await pool.getConnection();
    await connection.query(query, [
      nombre,
      programa,
      info,
      fecha,
      costo,
      vigencia,
      cupo,
      codigo,
      catalogo,
      centroCosto,
      cursoId,
    ]);
    res.status(200).json({ id: cursoId, nombre, info });
  } catch (err) {
    console.error("Error al actualizar el curso:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    if (connection) connection.release();
  }
});

// Eliminar un curso por ID
router.delete("/cursos/:id", async (req, res) => {
  const cursoId = req.params.id;
  const query = "DELETE FROM cursos WHERE id = ?";

  let connection;

  try {
    connection = await pool.getConnection();
    await connection.query(query, [cursoId]);
    res.status(204).json({ message: "Curso eliminado" });
  } catch (err) {
    console.error("Error al eliminar el curso:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;
