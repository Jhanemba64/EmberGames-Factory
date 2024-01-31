const express = require("express");

const router = express.Router();

const productRouter = require("./routers/productRouter");
const categoryRouter = require("./routers/categoryRouter");

// Authtentification
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);

/* ************************************************************************* */

module.exports = router;
