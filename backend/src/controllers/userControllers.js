const tables = require("../tables");

const add = async (req, res, next) => {
  try {
    const { email, hashedPassword } = req.body;
    const user = await tables.user.create(email, hashedPassword);

    if (user) {
      res.status(201).json({ message: "New user created" });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { add };
