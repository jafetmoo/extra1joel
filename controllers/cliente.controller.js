const Cliente = require('../models/cliente.model');

exports.getClientes = async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
};

exports.createCliente = async (req, res) => {
  const { nombre, telefono, correo, direccion, descuentoNavideño, comidaFavorita } = req.body;
  const cliente = await Cliente.create({ nombre, telefono, correo, direccion, descuentoNavideño, comidaFavorita });
  res.status(201).json(cliente);
};

exports.updateCliente = async (req, res) => {
  const { id } = req.params;
  const cliente = await Cliente.update(req.body, { where: { id_cliente: id } });
  res.json(cliente);
};

exports.deleteCliente = async (req, res) => {
  const { id } = req.params;
  await Cliente.destroy({ where: { id_cliente: id } });
  res.json({ message: 'Cliente eliminado' });
};
