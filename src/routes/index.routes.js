const express = require("express");
const router = express.Router();

// Controllers
const { renderRegistrar} = require("../controllers/index.controller");

router.get("/registrarer", renderRegistrar);

module.exports = router;