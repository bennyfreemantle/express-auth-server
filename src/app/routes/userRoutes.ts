import express from "express";
import { getProtectedUserInfo, getUserById, getUserByUsername } from "../controllers/userController";
import { authenticateToken } from "../../middlewares/authenticationMiddleware";

const router = express.Router();

router.get('/id/:id', getUserById);
router.get('/username/:username', getUserByUsername);

// This route is protected by the authentication middleware using JWT
router.get('/protected', authenticateToken, getProtectedUserInfo);

export default router;