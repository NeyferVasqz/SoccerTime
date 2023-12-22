const usersCtrl = {};


// Models
const User = require('../models/User');

// Modules
const passport = require("passport");

usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};

usersCtrl.registrarduenos = (req, res) => {
  res.render('users/signupDueños');
}

usersCtrl.guardarduenos = async (req, res) =>{
  let errors = [];
  const { fullname, email, telefono, password, confirm_password } = req.body;
  const roladmin = req.body.roladmin || true;
  if(!fullname){
    errors.push({ text: "Ingrese su nombre completo" });
  }
  if(!email){
    errors.push({ text: "Ingrese un email" });
  }
  if(!telefono){
    errors.push({ text: "Ingrese su telefono" });
  }
  if(!password){
    errors.push({ text: "Ingrese una contraseña" });
  }
  if (password != confirm_password) {
    errors.push({ text: "Password no coincide." });
  }
  if (password.length < 6) {
    errors.push({ text: "Passwords debe tener al menos 6 caracteres" });
  }
  if (errors.length > 0) {
    res.render("/registrar/duenos", {
      errors,
      fullname,
      email,
      telefono,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "El mail ya está registrado");
      res.redirect("/registrar/duenos");
    } else {
      // Saving a New User
      const newUser = new User({ fullname, email, telefono, password, roladmin });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Registro exitoso, solo podra registrar 3 canchas");
      res.redirect("/users/signin");
    }
  }
};

usersCtrl.singup = async (req, res) => {
  let errors = [];
  const { fullname, email, identificacion, telefono, password, confirm_password } = req.body;
  if(!fullname){
    errors.push({ text: "Ingrese su nombre completo" });
  }
  if(!email){
    errors.push({ text: "Ingrese un email" });
  }
  if(!identificacion){
    errors.push({ text: "Ingrese su identificacion" });
  }
  if(!telefono){
    errors.push({ text: "Ingrese su telefono" });
  }
  if(!password){
    errors.push({ text: "Ingrese una contraseña" });
  }
  if (password != confirm_password) {
    errors.push({ text: "Password no coincide." });
  }
  if (password.length < 6) {
    errors.push({ text: "Passwords debe tener al menos 6 caracteres" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      fullname,
      email,
      identificacion,
      telefono,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "El mail ya está registrado");
      res.redirect("/users/signup");
    } else {
      // Saving a New User
      const newUser = new User({ fullname, email, identificacion, telefono, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Registro exitoso");
      res.redirect("/users/signin");
    }
  }
};

usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin");
  console.log("aquiii")
};

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/signin",
    failureFlash: true
});

usersCtrl.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

module.exports = usersCtrl;