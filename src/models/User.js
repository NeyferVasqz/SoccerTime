const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  telefono: {type: Number},
  identificacion: { type: Number},
  password: { type: String, required: true },
  roladmin: { type: Boolean, default: false },
  prmium: { type: Boolean, default: false},
});

UserSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("user", UserSchema);