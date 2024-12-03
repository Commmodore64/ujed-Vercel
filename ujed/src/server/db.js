const mysql = require("mysql2");
require("dotenv").config(); // Importa las variables de entorno desde un archivo .env

// Configuración de la conexión a la base de datos MySQL
const pool = mysql.createPool({
  host: "localhost", // Host de la base de datos (generalmente 'localhost' si está en tu máquina)
  user: "backend_user", // Usuario de la base de datos
  port: "3306", // Puerto de la base de datos (generalmente 3306)
  password: "K0nT4BL3-F430!!", // Contraseña del usuario de la base de datos
  database: "ujedMysql", // Nombre de la base de datos que quieres usar
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
});

// Conectar a MySQL
pool.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos: ", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

module.exports = pool;
