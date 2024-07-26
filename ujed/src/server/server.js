const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const userdataRoute = require('./routes/userdataRoute');
const cursosRoutes = require('./routes/cursosRoutes');

app.use(cors()); // CORS para todas las rutas
    
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de API
app.use('/api', userRoutes); // Rutas de API para usuarios bajo /api
app.use('/api', userdataRoute); // Rutas de API para userdata bajo /api
app.use('/api', cursosRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
