const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes'); // Importa las rutas de API de usuarios

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de API
app.use('/api', userRoutes); // Usa las rutas de API para usuarios bajo /api

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
