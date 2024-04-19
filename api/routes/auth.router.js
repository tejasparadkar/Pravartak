const router = require("express").Router();
const {
  register,
  login,
  logout,
  getMe,
  getSupplier,
} = require("../controllers/auth.controller");

const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login); 
router.get("/logout", logout);
router.get("/supplier",getSupplier)
router.get("/me", protect, getMe);

module.exports = router;
