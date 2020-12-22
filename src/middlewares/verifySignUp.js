import User from "../models/User";


const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const username = await User.findOne({ username: req.body.username });
    if (username)
      return res.status(400).json({ message: "El nombre de usuario ya existe, favor especificar otro" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


export { checkDuplicateUsernameOrEmail };