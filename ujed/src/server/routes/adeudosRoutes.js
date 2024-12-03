const express = require("express");
const router = express.Router();
const pool = require("../db"); // Cambia `connection` por `pool`

// Obtener un adeudo por ID
router.get("/adeudos/:id", async (req, res) => {
  const ID_Adeudo = req.params.id;
  const query = "SELECT * FROM adeudos WHERE ID_Adeudo = ?";

  let connection;

  try {
    // Obtén una conexión del pool
    connection = await pool.getConnection();

    // Ejecuta la consulta
    const [results] = await connection.query(query, [ID_Adeudo]);

    res.status(200).json(results);
  } catch (err) {
    console.error("Error al obtener las inscripciones:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    // Libera la conexión
    if (connection) connection.release();
  }
});

// Obtener todos los adeudos
router.get("/adeudos", async (req, res) => {
  const query = "SELECT * FROM adeudos";

  let connection;

  try {
    // Obtén una conexión del pool
    connection = await pool.getConnection();

    // Ejecuta la consulta
    const [results] = await connection.query(query);

    res.status(200).json(results);
  } catch (err) {
    console.error("Error al obtener los adeudos:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    // Libera la conexión
    if (connection) connection.release();
  }
});

module.exports = router;
