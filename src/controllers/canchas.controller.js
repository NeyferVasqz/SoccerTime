const principalCtrl = {};
const Canchas = require("../models/canchas");
const { uploadImageLocal, deleteImage } = require("../utils/cloudinary");//Funciones para subir y eliminar
const fs = require("fs-extra");// para eliminar archivos en mi computador 

principalCtrl.renderIndex = async (req, res) => {
  const listadoCanchas = await Canchas.find().lean();
  res.render("index", { listadoCanchas: listadoCanchas });
};

principalCtrl.registrarcancha = (req, res) => {
  res.render("principal/registrarcancha");
};

principalCtrl.listarcancha = async (req, res) => {
  const listadoCanchas = await Canchas.find().lean();
  res.render("index", { listadoCanchas: listadoCanchas });
};

principalCtrl.mostrarcanchasduenos = async (req, res) => {
  console.log(req.params.id);
  const idu = req.params.id;
  const listadoCanchas = await Canchas.find({idusuario: idu}).lean();
  res.render("vermiscanchas", {listadoCanchas});
};

principalCtrl.guardarcancha = async (req, res) => {
  let errors = [];
  const userid = req.body.userid[0];
  console.log(req.body);
  console.log(userid);
  const {
    nombreLocal,
    direccion,
    ncanchas,
    namecancha1,
    preciocancha1,
    namecancha2,
    preciocancha2,
    namecancha3,
    preciocancha3,
  } = req.body;
  const MnombreLocal = nombreLocal.toUpperCase();
  const Mnamecancha1 = namecancha1.toUpperCase();
  const Mnamecancha2 = namecancha2.toUpperCase();
  const Mnamecancha3 = namecancha3.toUpperCase();
  if (!MnombreLocal) {
    errors.push({ text: "Ingrese el nombre del local" });
  }
  if (!direccion) {
    errors.push({ text: "Ingrese la dirección del local" });
  }
  if (!ncanchas) {
    errors.push({ text: "Ingrese el número de canchas" });
  }
  if (ncanchas > 3) {
    errors.push({ text: "Sobrepaso el maximo de canchas permitidas" });
  }
  if (ncanchas <= 0) {
    errors.push({ text: "Debe ingresar por lo menos una cancha" });
  }
  if (!Mnamecancha1) {
    errors.push({ text: "Ingrese nombre de la cancha numero 1" });
  }
  if (preciocancha1 <= 0) {
    errors.push({ text: "Ingrese un valor mayor a 0" });
  }
  if (
    !req.files ||
    !req.files.imagen ||
    Object.keys(req.files.imagen).length === 0
  ) {
    errors.push({ text: "Ingrese la imagen del local" });
  }
  if (errors.length > 0) {
    res.render("principal/registrarcancha", {
      errors,
      nombreLocal,
      direccion,
      ncanchas,
      namecancha1,
      preciocancha1,
    });
  } else {
    const newCancha = new Canchas({
      idusuario: userid,
      nombreLocal: MnombreLocal,
      direccion,
      ncanchas,
    });
    if (Mnamecancha1 && preciocancha1) {
      newCancha.infocanchas = {
        namecancha1: Mnamecancha1,
        preciocancha1: preciocancha1,
      };
    }
    if (Mnamecancha2 && preciocancha2) {
      newCancha.infocanchas = {
        namecancha1: Mnamecancha1,
        preciocancha1: preciocancha1,
        namecancha2: Mnamecancha2,
        preciocancha2: preciocancha2,
      };
    }
    if (Mnamecancha3 && preciocancha3) {
      newCancha.infocanchas = {
        namecancha1: Mnamecancha1,
        preciocancha1: preciocancha1,
        namecancha2: Mnamecancha2,
        preciocancha2: preciocancha2,
        namecancha3: Mnamecancha3,
        preciocancha3: preciocancha3,
      };
    }
    if (req.files.imagen) {
      const result = await uploadImageLocal(req.files.imagen.tempFilePath);//guardar en cloudinary
      console.log(result);
      newCancha.image = {
        public_id: result.public_id,//direccion de mi imagen en base de cloudinary 
        secure_url: result.secure_url,//url para mostrar esa imagen
      };
      await fs.unlink(req.files.imagen.tempFilePath);// metodo para borrar el archivo en mi computadora
    }
    await newCancha.save();
    req.flash("success_msg", "Registro exitoso");
    res.redirect("/");
  }
};

principalCtrl.reservar = async (req, res) => {
  const idC = req.params.id;
  const canchas = await Canchas.findById(idC).lean();
  console.log(canchas);
  res.render("principal/reservar", { canchas: canchas });
};

principalCtrl.editar = async (req, res) => {
  const id = req.params.id;
  const cancha = await Canchas.findById(id).lean();
  console.log(cancha);
  res.render("principal/editar", { cancha });
};

principalCtrl.actualizar = async (req, res) => {
  const { id } = req.params;
  const { preciocancha1, preciocancha2, preciocancha3 } = req.body;
  console.log(id, req.body);
  console.log(preciocancha1, preciocancha2, preciocancha3);

  if (preciocancha1){
    await Canchas.findByIdAndUpdate(id, {
      $set: {
        "infocanchas.preciocancha1": preciocancha1,
      },
    });
  }

  if (preciocancha1 && preciocancha2){
    await Canchas.findByIdAndUpdate(id, {
      $set: {
        "infocanchas.preciocancha1": preciocancha1,
        "infocanchas.preciocancha2": preciocancha2,
      },
    });
  }
  if (preciocancha1 && preciocancha2 && preciocancha3){
    await Canchas.findByIdAndUpdate(id, {
      $set: {
        "infocanchas.preciocancha1": preciocancha1,
        "infocanchas.preciocancha2": preciocancha2,
        "infocanchas.preciocancha3": preciocancha3,
      },
    });
  }
  res.redirect("/");
};

principalCtrl.eliminar = async (req, res) => {
  const { id } = req.params;
  const cancha = await Canchas.findByIdAndDelete(id);
  await deleteImage(cancha.image.public_id);
  res.redirect("/");
};

module.exports = principalCtrl;
