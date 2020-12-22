import { Router } from "express";
const router = Router();

import * as control from '../controllers/coingecko.controller';
import { verifyToken } from "../middlewares";

//testear el servidor localhost:4000/api/coins || test
router.get("/test", control.testserver);

router.get("/coins", verifyToken, control.getcoins);

export default router;