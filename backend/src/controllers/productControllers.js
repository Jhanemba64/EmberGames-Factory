const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const products = await tables.product.readAll();

    if (products === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(products);
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const read = async (req, res, next) => {
  try {
    const product = await tables.product.read(Number(req.params.id));

    if (product === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(product);
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity, price, category_id: categoryId } = req.body;
    const updatedProduct = await tables.product.update(
      id,
      name,
      quantity,
      price,
      categoryId
    );

    if (updatedProduct === null) {
      res.sendStatus(404);
    } else {
      res.status(200);
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const add = async (req, res, next) => {
  try {
    const { name, quantity, price, category_id: categoryId } = req.body;

    const newProduct = await tables.product.create(
      name,
      quantity,
      price,
      categoryId
    );

    if (newProduct === null) {
      res.sendStatus(404);
    } else {
      res.status(200);
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await tables.product.delete(Number(id));

    if (deletedProduct === null) {
      res.sendStatus(404);
    } else {
      res.status(200);
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
