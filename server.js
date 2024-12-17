const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const clienteRoutes = require('./routes/clientes.js');

const app = express();

app.use(express.json());
app.use('/clientes', clienteRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT || 8080, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 8080}`);
});
