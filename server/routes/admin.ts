import { Router } from "express";
import { getAllUsers } from "../controllers/adminController";
import verifyJWT from "../middlewares/verifyJWT";

const adminRouter = Router();

adminRouter.route("/").get(verifyJWT, getAllUsers);

export default adminRouter;
