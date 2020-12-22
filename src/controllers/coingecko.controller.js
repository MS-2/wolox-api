import User from '../models/User';
import coingecko from 'coingecko-api';
const CoinGeckoClient = new coingecko();

export const testserver = async (req, res) => {
    let data = await CoinGeckoClient.ping()
    return res.json(data);
}

export const getcoins = async (req, res) => {
    // obtengo el id del usuario despues de verificarlo mediante el middleware
    const userId = res.locals.id;

    // obtengo el usuario de bd
    const user = await User.findById(userId)
    const moneda = user.moneda;

    //obtengo todas las monedas y su data
    let response = await CoinGeckoClient.coins.all();

    //creo un nuevo arreglo de moneda con los datos especificados pasandole la moneda en el valor preferido del usuario
    let coins = response.data.map((currentValue) => {
        let newArray = [
            currentValue.market_data.current_price[moneda],
            currentValue.symbol,
            currentValue.image.thumb,
            currentValue.name,
            currentValue.last_updated
        ]
        return newArray;
    });
    //retorno la lista 
    return res.json(coins);
}
