const express = require("express");

const router = express.Router();

const { add } = require("../controllers/userControllers");

const { hash } = require("../services/hashed");

router.post("/", hash, add);

module.exports = router;
