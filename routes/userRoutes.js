const express = require("express");
const router = express.Router();
const {
  getUsers,
  updateScore,
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userControllers");
const { protect } = require('../middleware/authMiddleware')

router.route("/").post(registerUser).get(getUsers);
router.put("/:id", updateScore)
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;