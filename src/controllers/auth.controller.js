import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";

export const signUp = async (req, res) => {

  const { nombre, apellido, password, username, moneda } = req.body;

  try {
    const newUser = new User({
      nombre,
      apellido,
      username,
      password: await User.encryptPassword(password),
      moneda

    })

    // Saving the User Object in Mongodb
    const saveuser = await newUser.save();
    // send the User Object in Mongodb
    res.status(200).send(`<p>usuario registrado con exito ${saveuser}</p> <a href="/api/auth/signin">volver atras</a>`)
  } catch (error) {
    res.status(400).send(`problema registrando al usuario`)
  }


};

export const signin = async (req, res) => {
  try {
    //busco si ya existe un usuario con ese nickname
    const userfound = await User.findOne({ username: req.body.username })

    if (!userfound) {
      return res.status(400).json({ message: "usuario no encontrado" })
    }
    //uso un metodo statico para comparar la contraseña (comparePassword se puede encontrar en el modelUser)
    const match = await User.comparePassword(req.body.password, userfound.password)

    if (!match) {
      return res.status(401).json({ token: null, message: "contraseña invalida" })
    }

    const token = jwt.sign({ id: userfound._id }, config.SECRET, { expiresIn: '1h' })
    res.locals.token = token;
    res.send(`<p>token de usuario con el id embebido :  ${token}</p> <a href="/api/coins">copiar y pegar el token en los params de esta ruta x-token : token</a>`)

  } catch (error) {
    console.log(error);
  }
};