import jwt from 'jsonwebtoken'
import config from '../config'


export const verifyToken = async (req, res, next) => {
  //obtengo el token de los headers
  let token = req.headers["x-token"];
  //verifico si existe
  if (!token) return res.status(403).json({ message: "debe proveer un token en los parametros" });
  //verifico que el token siga siendo valido
  try {
    jwt.verify(token, config.SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json(err.message)
      } else {
        //le paso a la siguiente funcion el id del usuario en cuestion embebida en el token 
        res.locals.id = decode.id;
        next();
      }
    });
    //ante la duda ! 
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};
