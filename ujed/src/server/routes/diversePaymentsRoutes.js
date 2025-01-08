const express = require("express");
const router = express.Router();
const pool = require("../db"); // Usamos pool con promesas

// Obtener todos los pagos
router.get("/diversepayments", async (req, res) => {
  const query = "SELECT * FROM pagos_diversos";

  try {
    const [results] = await pool.query(query); // Consulta directa al pool
    res.status(200).json(results);
  } catch (err) {
    console.error("Error al obtener pagos:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
