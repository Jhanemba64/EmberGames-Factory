const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async readByEmail(email) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email=?`,
      [email]
    );

    return rows[0];
  }

  async create(email, hashedPassword) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (email, hashed_password) VALUES (?,?)`,
      [email, hashedPassword]
    );
    return result.insertId;
  }
}

module.exports = UserManager;
