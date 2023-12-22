pagosCtrl = {};
const Canchas = require("../models/canchas");
const User = require("../models/User");
const Reserva = require("../models/reservas");
const nodemailer = require("nodemailer");//dependencia para poder mandar correos como gmail hotmail etc
//Variables globales para poder utilizarla en cualquier lugar de este controlaor
global.seleccionada = null;
global.precio = null;

pagosCtrl.registroreserva = async (req, res) => {
  const id = req.body.cancha_id;
  const canchaseleccionada = req.body.cancha_seleccionada;
  const cancha = await Canchas.findById(id).lean();
  console.log(cancha);
  console.log(canchaseleccionada);
  res.render("principal/formreservas", {
    cancha: cancha,
    canchaseleccionada: canchaseleccionada,
  });
};

pagosCtrl.guardarreserva = async (req, res) => {
  const idu = req.body.idusuario;
  const idc = req.body.idcancha;
  const canchaSelec = req.body.cancha;
  const fecha = req.body.fecha;
  const hora = req.body.hora;
  const usuario = await User.findById(idu).lean();
  const cancha = await Canchas.findById(idc).lean();
  const idd = cancha.idusuario;
  const dueno = await User.findById(idd).lean();
  if(canchaSelec === "1"){
    global.seleccionada = cancha.infocanchas.namecancha1;
    global.precio = cancha.infocanchas.preciocancha1
  }
  if(canchaSelec === "2"){
    global.seleccionada = cancha.infocanchas.namecancha2;
    global.precio = cancha.infocanchas.preciocancha2
  }
  if(canchaSelec === "3"){
    global.seleccionada = cancha.infocanchas.namecancha3;
    global.precio = cancha.infocanchas.preciocancha3
  }
  const horaexistente = await Reserva.findOne({idcancha: idc, nombrecancha: global.seleccionada, hora: hora, fecha: fecha});
  if (horaexistente) {
    req.flash("error_msg", "Esta hora ya esta reservada en esa cancha");
    res.redirect(`/reservar/${idc}`);
  }else{
    const newReserva = new Reserva({
      idusuario: idu,
      idcancha: idc,
      nombrecancha: global.seleccionada,
      preciocancha: global.precio,
      fecha,
      hora,
    });
    const duenoTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tsoccer042@gmail.com",
        pass: "xhbkpbhtapezaqbs",
      },
    });

    const duenoMailOptions = {
      from: "tsoccer042@gmail.com",
      to: dueno.email,
      subject: "Nueva reserva",
      html: `<p>Se ha realizado una nueva reserva</p>
             <p>Detalles de la reserva:</p>
             <ul>
               <li>Cancha: ${global.seleccionada}</li>
               <li>Precio: ${global.precio}</li>
             </ul>
             <p>Detalles del Usuario:</p>
             <ul>
               <li>Nombre: ${usuario.fullname} </li>
               <li>Corre Electronicp: ${usuario.email}</li>
               <li>Contacto: ${usuario.telefono}</li>
               <li>Identificacion: ${usuario.identificacion}</li>
             </ul>`,
    };
    duenoTransporter.sendMail(duenoMailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar correo al dueño:", error);
      } else {
        console.log("Correo enviado al dueño:", info.response);
      }
    });

    const userTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tsoccer042@gmail.com",
        pass: "xhbkpbhtapezaqbs",
      },
    });
  
    const userMailOptions = {
      from: "tsoccer042@gmail.com",
      to: usuario.email,
      subject: "Confirmación de reserva exitosa",
      html: `<p>Tu reserva fue procesada con éxito. Gracias por seleccionar nuestros servicios de reservas.</p>
             <p>Puede realizar el pago en el establecimiento</p>
             <p>Detalles de la reserva:</p>
             <ul>
               <li>Local: ${cancha.nombreLocal}</li>
               <li>Direccion: ${cancha.direccion}</li>
               <li>Cancha: ${global.seleccionada}</li>
               <li>Precio: ${global.precio}</li>
             </ul>`,
    };
  
    userTransporter.sendMail(userMailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar correo al usuario:", error);
      } else {
        console.log("Correo enviado al usuario:", info.response);
      }
    });
    const guardado = await newReserva.save();
    console.log(guardado);
    req.flash("success_msg","Su reservacion fue exitosa");
    res.redirect("/");
  }
};

module.exports = pagosCtrl;