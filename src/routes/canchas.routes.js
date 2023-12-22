const express = require("express");
const router = express.Router();


const {
    renderIndex,
    mostrarcanchasduenos,
    registrarcancha,
    guardarcancha,
    editar,
    eliminar, 
    actualizar,
    reservar


}= require("../controllers/canchas.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

router.get("/", renderIndex);
router.get("/registrarcancha", isAuthenticated, registrarcancha);
router.post("/guardarcancha", isAuthenticated, guardarcancha);
router.get("/locales/canchas/:id", isAuthenticated, mostrarcanchasduenos);
router.get("/editar/:id", isAuthenticated, editar);
router.get("/eliminar/:id", isAuthenticated, eliminar);
router.get("/reservar/:id",  reservar);
router.post("/actualizar/precio/:id", isAuthenticated, actualizar);

module.exports = router;