const Account = require("../accounts/accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const payload = req.body;

  if (payload.name === undefined || payload.budget === undefined) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (typeof payload.name !== "string") {
    res.status(400).json({ message: "name of account must be a string" });
  } else if (
    payload.name.trim().length < 3 ||
    payload.name.trim().length > 100
  ) {
    res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (typeof payload.budget !== "number") {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (payload.budget < 0 || payload.budget > 1000000) {
    res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  } else {
    // we checked the payload! yay. now we need to trim it! with .trim()
    let trimName = payload.name.trim();
    payload.name = trimName;
    next();
  }
};

exports.checkAccountId = async (req, res, next) => {
  const id = req.params.id;

  await Account.getById(id).then((accounts) => {
    if (!accounts) {
      console.log(accounts);
      res.status(404).json({ message: "account not found" });
    } else {
      console.log("am i still running?");
      req.accounts = accounts;
      next();
    }
  });

  // const accounts = await Account.getById(id);
  // if (!accounts) {
  //   console.log(accounts);
  //   res.status(404).json({ message: "account not found" });
  // } else {
  //   console.log("am i still running?");
  //   req.accounts = accounts;
  //   next();
  // }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const name = req.body.name;
  // we need to check if the name is in the database
  const currentObject = await Account.getAll();
  console.log(currentObject);
  const [sameName] = currentObject.filter((project) => project.name === name);
  console.log(sameName);
  if (sameName) {
    res.status(400).json({ message: "that name is taken" });
  } else {
    next();
  }
};
