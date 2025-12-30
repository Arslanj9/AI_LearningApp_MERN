const express = require("express");
const router = express.Router();

const {
  protect,
  adminOnly
} = require("../middlewares/authMiddleware");

// Example admin-only route
router.get(
  "/dashboard",
  protect,
  adminOnly,
  (req, res) => {
    res.json({
      message: "Welcome to Admin Dashboard",
      adminId: req.user.id
    });
  }
);

module.exports = router;
