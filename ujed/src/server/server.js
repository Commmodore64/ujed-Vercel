const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const userdataRoute = require('./routes/userdataRoute');
const cursosRoutes = require('./routes/cursosRoutes');
const inscripcionesRoutes = require('./routes/inscripcionesRoutes');
const programRoutes = require('./routes/programRoutes');

app.use(cors()); // CORS para todas las rutas
    
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de API
app.use('/api', userRoutes); // Rutas de API para usuarios bajo /api
app.use('/api', userdataRoute); // Rutas de API para userdata bajo /api
app.use('/api', cursosRoutes); // Rutas de API para cursos bajo /api
app.use('/api', inscripcionesRoutes); // Rutas de API para inscripciones bajo /api
app.use('/api', programRoutes); // Rutas de API para programRoutes bajo /api

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
