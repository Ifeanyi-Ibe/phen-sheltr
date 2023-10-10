const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");
const { authMiddleware, isAdmin } = require("../middleware/auth");

router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUser);
router.post("/", UserController.createUser);
router.post("/login", UserController.login);
router.delete("/:id", authMiddleware, isAdmin, UserController.deleteUser);
router.put("/:id", authMiddleware, UserController.updateUser);
router.put("/block/:id", authMiddleware, isAdmin, UserController.blockUser);
router.put("/unblock/:id", authMiddleware, isAdmin, UserController.unblockUser);

module.exports = router;
