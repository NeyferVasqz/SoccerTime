// models/cancha.js

const mongoose = require("mongoose");

const canchaSchema = new mongoose.Schema({
  idusuario: {type: String, required: true},
  nombreLocal: {type: String, required: true},
  direccion: {type: String, required: true},
  ncanchas:{type: Number, require: true},
  infocanchas: {namecancha1: String, preciocancha1: Number, namecancha2: String, preciocancha2: Number, namecancha3: String, preciocancha3: Number, namecancha4: String, preciocancha4: Number, namecancha5: String, preciocancha5: Number},
  image: { public_id: String, secure_url: String },
});

const Cancha = mongoose.model("Cancha", canchaSchema);

module.exports = Cancha;
