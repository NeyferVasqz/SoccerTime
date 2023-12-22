const express = require("express");
const router = express.Router();


const {
    registroreserva,
    guardarreserva,

}= require("../controllers/pagos.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

router.post("/registrar", isAuthenticated, registroreserva);
router.post("/guardar", isAuthenticated, guardarreserva);

module.exports = router;