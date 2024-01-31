const argon2 = require("argon2");
const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await tables.user.readByEmail(email);

    if (user == null) {
      res.sendStatus(422);
    }
    const verify = await argon2.verify(user.hashed_password, password);

    if (verify) {
      delete user.hashed_password;
      res.status(200).json(user);
    } else {
      res.sendStatus(422);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
