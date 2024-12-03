const express = require("express");
const router = express.Router();
const pool = require("../db"); // Usamos pool en lugar de connection

// Obtener un centro de costo por ID
router.get("/centroCosto/:id", async (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM centroCosto WHERE id = ?";

  let connection;

  try {
    connection = await pool.getConnection();

    const [results] = await connection.query(query, [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Centro de Costo no encontrado" });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error("Error al obtener el centro de costo:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    if (connection) connection.release();
  }
});

// Obtener todos los centros de costo
router.get("/centroCosto", async (req, res) => {
  const query = "SELECT * FROM centroCosto";

  let connection;

  try {
    connection = await pool.getConnection();

    const [results] = await connection.query(query);

    res.status(200).json(results);
  } catch (err) {
    console.error("Error al obtener los centros de costo:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;
