import express from "express";
import { autoAbsent, autoCheckout } from "../controllers/cron.controller.js";
import { verifyCron } from "../middleware/verifyCron.js";

const cronRoutes = express.Router();

cronRoutes.post("/auto-absent", verifyCron, autoAbsent);

cronRoutes.post("/auto-checkout", verifyCron, autoCheckout);

export default cronRoutes;