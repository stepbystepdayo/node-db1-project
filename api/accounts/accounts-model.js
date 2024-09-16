const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  // return db("accounts").where("id", id) // ORIGINAL CODE
  return db("accounts").where("id", id).first();
  // no, you need to return the object, not the array.
};

const create = async (account) => {
  const [id] = await db("accounts").insert(account);
  return getById(id);
};

const updateById = async (id, account) => {
  await db("accounts").where({ id }).update(account);
  return getById(id);
};

const deleteById = async (id) => {
  const deleteAccount = await getById(id);
  await db("accounts").where("id", id).delete();
  return deleteAccount;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
