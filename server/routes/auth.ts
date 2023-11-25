import { Router } from "express";
import { handleLogin, handleLogout, handleRefreshToken, handleRegister } from "../controllers/authController";
const authRouter = Router();

authRouter.post("/login", handleLogin);
authRouter.post("/signup", handleRegister);
authRouter.get("/refresh", handleRefreshToken);
authRouter.get("/logout", handleLogout);

export default authRouter;
