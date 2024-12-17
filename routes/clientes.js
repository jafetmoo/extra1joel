const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Configurar la conexión a MySQL
const db = mysql.createConnection({
    host: 'bvhnajnv5q2bwk6qbc5x-mysql.services.clever-cloud.com', // El host de tu base de datos (Clever Cloud)
    user: 'u0m5fdwxqkyrxaoy',      // Usuario de MySQL
    password: 'BB1oiGuGdHu26BwmIcqX',  // Contraseña de MySQL
    database: 'bvhnajnv5q2bwk6qbc5x', // Nombre de la base de datos
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Ruta GET para obtener los clientes con paginación predeterminada de 30
router.get('/', (req, res) => {
    // Definir la página y el límite de resultados
    const page = parseInt(req.query.page) || 1;  // Página (por defecto 1)
    const limit = parseInt(req.query.limit) || 30; // Limitar a 30 resultados por defecto
    const offset = (page - 1) * limit;  // Cálculo de desplazamiento (offset)
  
    // Consulta SQL con paginación
    const sql = 'SELECT * FROM clientes LIMIT ? OFFSET ?';
    
    db.query(sql, [limit, offset], (err, results) => {
      if (err) {
        console.error('Error al obtener los clientes:', err);
        res.status(500).json({ error: 'Error al obtener los clientes' });
      } else {
        console.log('Clientes obtenidos:', results);
        res.status(200).json(results);
      }
    });
  });
  

// Ruta POST para crear un cliente
router.post('/', async (req, res) => {
    const { nombre, telefono, correo, direccion, descuento_navideno, comida_favorita } = req.body;

    try {
        const [rows] = await db.execute(
            `INSERT INTO clientes (nombre, telefono, correo, direccion, descuento_navideno, comida_favorita)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, telefono, correo, direccion, descuento_navideno, comida_favorita]
        );

        res.status(201).json({
            id_cliente: rows.insertId,
            nombre,
            telefono,
            correo,
            direccion,
            descuento_navideno,
            comida_favorita
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear cliente' });
    }
});

// Ruta PUT para actualizar un cliente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, correo, direccion, descuento_navideno, comida_favorita } = req.body;

    try {
        const [result] = await db.execute(
            `UPDATE clientes SET nombre = ?, telefono = ?, correo = ?, direccion = ?, descuento_navideno = ?, comida_favorita = ?
             WHERE id_cliente = ?`,
            [nombre, telefono, correo, direccion, descuento_navideno, comida_favorita, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.status(200).json({
            id_cliente: id,
            nombre,
            telefono,
            correo,
            direccion,
            descuento_navideno,
            comida_favorita
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar cliente' });
    }
});

// Ruta DELETE para eliminar un cliente
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute(`DELETE FROM clientes WHERE id_cliente = ?`, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.status(200).json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar cliente' });
    }
});

module.exports = router;
