const tables = require("../tables");

const read = async (req, res, next) => {
  try {
    const category = await tables.category.read(Number(req.params.id));

    if (category == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(category);
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const browse = async (req, res, next) => {
  try {
    const categories = await tables.category.readAll();
    if (categories == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(categories);
    }
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await tables.category.update(Number(id), name);
    if (updatedCategory == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: `Category ${name} updated` });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const add = async (req, res, next) => {
  try {
    const { name } = req.body;

    const newCategory = await tables.category.create(name);

    if (newCategory == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: `Category ${name} created` });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await tables.category.delete(Number(id));

    if (deletedCategory == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: `Category #${id} deleted` });
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
