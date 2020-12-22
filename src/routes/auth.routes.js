import { Router } from "express";
const router = Router();

import * as control from '../controllers/auth.controller';
import { checkDuplicateUsernameOrEmail } from "../middlewares";
// localhost:4000/api/auth/signin || signin
//ruta de login recibe {username: $$$, password: $$$$m nombre:$$$, apellido:$$$$, moneda:$$$$}
router.post("/signup", [checkDuplicateUsernameOrEmail], control.signUp);

//ruta de login recibe {username: $$$, password: $$$$}
router.post("/signin", control.signin);

export default router;