import { Router } from 'express'
import * as control from '../controllers/usercontroller'
import { verifyToken } from '../middlewares'

const router = Router();
//localhost:4000/api/user/addcoin

//recibe los parametros de una criptomoneda seleccionada de la lista verifica el token y lo almacena en el usuario 
router.post('/addcoin', verifyToken, control.addCoin)

router.get('/coins/desc', verifyToken, control.getuserTopCoinsDESC)

router.get('/coins/asc', verifyToken, control.getuserTopCoinsASC)

router.get('/', control.getusers)


export default router;  