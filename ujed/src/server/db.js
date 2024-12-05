const mysql = require("mysql2");
require("dotenv").config(); // Importa las variables de entorno desde un archivo .env

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: "192.168.1.120", // Host de la base de datos (generalmente 'localhost' si está en tu máquina)
  user: "cesar", // Usuario de la base de datos
  port: "3306", // Puerto de la base de datos (generalmente 3306)
  password: "cesar", // Contraseña del usuario de la base de datos
  database: "ujedPrueba", // Nombre de la base de datos que quieres usar
});

// Conectar a MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos: ", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

module.exports = connection;
