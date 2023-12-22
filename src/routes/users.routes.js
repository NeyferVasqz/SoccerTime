const router = require("express").Router();

const {
  renderSignUpForm,
  registrarduenos,
  guardarduenos,
  singup,
  renderSigninForm,
  signin,
  logout
} = require("../controllers/users.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// Routes
router.get("/registrar/duenos", registrarduenos);
router.post("/guardar/duenos", guardarduenos);
router.get("/users/signup", renderSignUpForm);
router.post("/users/signup", singup);
router.get("/users/signin", renderSigninForm);
router.post("/users/signin", signin);
router.get("/users/logout", logout); 

module.exports = router;