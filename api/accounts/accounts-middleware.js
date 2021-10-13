const Account = require("../accounts/accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const payload = req.body;

  if (payload.name == undefined || payload.budget == undefined) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (typeof payload.name !== "string") {
    res.status(400).json({ message: "name of account must be a string" });
  } else if (payload.name.length < 3 || payload.name.length > 100) {
    res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (Number.isNaN(payload.budget) == true) {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (payload.budget < 0 || payload.budget > 1000000) {
    res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  } else {
    next();
  }
};

exports.checkAccountId = async (req, res, next) => {
  const id = req.params.id;
  const account = await Account.getById(id);
  if (!account) {
    res.status(400).json({ message: "account not found" });
  } else {
    req.account = account;
    next();
  }
};

exports.checkAccountNameUnique = (req, res, next) => {
  const name = req.body.name;
  if (name) {
    res.status(400).json({ message: "that name is taken" });
  }
};
