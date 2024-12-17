const express = require('express'); // Importar Express
const cors = require('cors');       // Importar CORS
const swaggerUi = require('swagger-ui-express'); // Importar Swagger
const swaggerDocument = require('./swagger.json'); // Importar archivo Swagger


const clientesRoutes = require('./routes/clientes'); // Importar rutas de clientes

const app = express(); // Inicializar la aplicación Express

// Middlewares
app.use(express.json()); // Habilitar JSON
app.use(cors()); // Habilitar CORS

// Rutas
app.use('/api/clientes', clientesRoutes); // Usar rutas de clientes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Usar Swagger

// Puerto y servidor
const PORT = process.env.PORT || 3000; // Definir puerto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
