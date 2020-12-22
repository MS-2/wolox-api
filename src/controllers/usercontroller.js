import User from "../models/User";
import Coin from '../models/Coin';

export const addCoin = async (req, res) => {
  //obtengo el id del middleware
  const userId = res.locals.id;
  //paso parametros desde el body de los datos de la criptomoneda q quiero guardar
  const { nombre, simbolo, precio, icono, lastUpdate } = req.body;

  try {
    const coin = new Coin({
      nombre,
      simbolo,
      precio,
      icono,
      lastUpdate,
      owner: userId
    });

    //añado la refeencia de la moneda al modelo de usuario
    const user = await User.findByIdAndUpdate(userId, { $push: { coins: coin._id } }, { new: true })
    //guardo
    const saved = await coin.save();
    //envio respuesta
    res.status(200).json("se ha guardado la moneda " + saved.nombre + " en el usuario " + user.nombre)
  } catch (error) {
    res.status(400).json(error)
  }



}

export const getusers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.json(error);
  }

}

export const getuserTopCoinsDESC = async (req, res) => {

  const userId = res.locals.id;
  const user = await User.findById(userId);
  const topMonedas = user.coins;

  try {
    const arreglo = topMonedas.map((currentValue) => {
      let newArray = {
        "precio(esta en la moneda favorita)": currentValue.precio,
        "simbolo": currentValue.simbolo,
        "icono": currentValue.icono,
        "nombre": currentValue.nombre,
      }
      return newArray;
    });
    const descendente = (prev, next) => {
      if (prev.precio > next.precio) {
        return 1;
      }
      if (prev.precio < next.precio) {
        return -1;
      }
      return prev.precio - next.precio;
    };
    const ordenadoDESCYlimitadoa25 = arreglo.sort(descendente).slice(0, 5)
    return res.json(ordenadoDESCYlimitadoa25);

  } catch (error) {
    return res.json(error);
  }

}


export const getuserTopCoinsASC = async (req, res) => {
  const userId = res.locals.id;
  const user = await User.findById(userId);
  const topMonedas = user.coins;

  const arreglo = topMonedas.map((currentValue) => {
    let newArray = {
      "precio": currentValue.precio,
      "simbolo": currentValue.simbolo,
      "icono": currentValue.icono,
      "nombre": currentValue.nombre,
    }
    return newArray;
  });

  const ascendente = (prev, next) => {
    if (prev.precio < next.precio) {
      return 1;
    }
    if (prev.precio > next.precio) {
      return -1;
    }
    return prev.precio - next.precio;
  };

  const ordenadoASCYlimitadoa25 = arreglo.sort(ascendente).slice(0, 5)

  return res.json(ordenadoASCYlimitadoa25);

}







