const express = require("express");
const router = express.Router();
const controller = require("../../controlers/client/user.controller.js");

const authMiddleware = require("../../middlewares/auth.midlleware.js")

router.post("/register",controller.register)
router.post("/login",controller.login)
router.post("/pasword/forgot",controller.forgotPassword)
router.post("/pasword/otp",controller.otpPassword)
router.post("/pasword/reset",controller.resetPassword)
router.get("/detail",authMiddleware.requireAuth,controller.detail)
router.get("/list",authMiddleware.requireAuth,controller.list)

module.exports = router;