const express = require("express");
const router = express.Router();
const pool = require("../db"); // Cambia `connection` por `pool`

// Crear un nuevo catálogo
router.post("/catalogo", async (req, res) => {
  const {
    cuenta,
    nombre_cuenta,
    subcuenta,
    tipo_poliza,
    llave_concepto,
    concepto,
  } = req.body;
  const query =
    "INSERT INTO catalogo_conceptos (cuenta, nombre_cuenta, subcuenta, tipo_poliza, llave_concepto, concepto) VALUES (?, ?, ?, ?, ?, ?)";

  try {
    const [results] = await pool
      .promise()
      .query(query, [
        cuenta,
        nombre_cuenta,
        subcuenta,
        tipo_poliza,
        llave_concepto,
        concepto,
      ]);

    res.status(201).json({
      id: results.insertId,
      cuenta,
      nombre_cuenta,
      subcuenta,
      tipo_poliza,
      llave_concepto,
      concepto,
    });

    console.log("Catálogo creado correctamente:", {
      id: results.insertId,
      cuenta,
      nombre_cuenta,
      subcuenta,
      tipo_poliza,
      llave_concepto,
      concepto,
    });
  } catch (err) {
    console.error("Error al crear el catálogo:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener todos los catálogos
router.get("/catalogo", async (req, res) => {
  const query = "SELECT * FROM catalogo_conceptos";

  try {
    const [results] = await pool.promise().query(query);
    res.status(200).json(results);
  } catch (err) {
    console.error("Error al obtener el catálogo:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualizar un catálogo por ID
router.put("/catalogo/:id", async (req, res) => {
  const catalogoId = req.params.id;
  const {
    cuenta,
    nombre_cuenta,
    subcuenta,
    tipo_poliza,
    llave_concepto,
    concepto,
  } = req.body;
  const query =
    "UPDATE catalogo_conceptos SET cuenta = ?, nombre_cuenta = ?, subcuenta = ?, tipo_poliza = ?, llave_concepto = ?, concepto = ? WHERE id = ?";

  try {
    const [results] = await pool
      .promise()
      .query(query, [
        cuenta,
        nombre_cuenta,
        subcuenta,
        tipo_poliza,
        llave_concepto,
        concepto,
        catalogoId,
      ]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Catálogo no encontrado" });
    }

    res.status(200).json({
      id: catalogoId,
      cuenta,
      nombre_cuenta,
      subcuenta,
      tipo_poliza,
      llave_concepto,
      concepto,
    });

    console.log("Catálogo actualizado correctamente:", {
      id: catalogoId,
      cuenta,
      nombre_cuenta,
      subcuenta,
      tipo_poliza,
      llave_concepto,
      concepto,
    });
  } catch (err) {
    console.error("Error al actualizar el catálogo:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar un catálogo por ID
router.delete("/catalogo/:id", async (req, res) => {
  const catalogoId = req.params.id;
  const query = "DELETE FROM catalogo_conceptos WHERE id = ?";

  try {
    const [results] = await pool.promise().query(query, [catalogoId]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Catálogo no encontrado" });
    }

    res.status(204).send();
    console.log("Catálogo eliminado correctamente, ID:", catalogoId);
  } catch (err) {
    console.error("Error al eliminar el catálogo:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
