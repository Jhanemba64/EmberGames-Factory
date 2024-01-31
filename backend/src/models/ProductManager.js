const AbstractManager = require("./AbstractManager");

class ProductManager extends AbstractManager {
  constructor() {
    super({ table: "product" });
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT p.id, p.name, p.price, p.quantity, p.is_fav, c.name AS category 
        FROM ${this.table} AS p 
        INNER JOIN category AS c ON c.id = p.category_id 
        ORDER BY p.id ASC`
    );

    return rows;
  }

  async create(name, quantity, price, categoryId) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, quantity, price, category_id) VALUES (?, ?, ?, ?)`,
      [name, quantity, price, categoryId]
    );

    return result.insertId;
  }

  async update(id, quantity, isFav) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET quantity = ?, is_fav = ? WHERE id = ?`,
      [quantity, isFav, id]
    );

    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = ProductManager;
