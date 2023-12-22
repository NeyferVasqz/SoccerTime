const mongoose = require("mongoose");

const ReservasSchema = new mongoose.Schema({
  idusuario: { type: String, required: true },
  idcancha: { type: String, required: true },
  nombrecancha: {type: String, required: true},
  preciocancha: {type: String, required: true},
  fecha: {type: String, required: true},
  hora: { type: String, required: true },
});

const Reservas = mongoose.model("Reservas", ReservasSchema);

module.exports = Reservas;