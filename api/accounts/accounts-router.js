const router = require("express").Router();
const Accounts = require("./accounts-model");

const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require("./accounts-middleware");

router.get("/", (req, res) => {
  Accounts.getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving the accounts" });
    });
});

router.get("/:id", checkAccountId, (req, res, next) => {
  res.status(200).json(req.accounts);
});

router.post("/", checkAccountPayload, (req, res, next) => {
  const newAccount = req.body;
  // if (!newAccount.name || !newAccount.budget) {
  //   res.status(400).json({ message: "name and budget are required" });
  // } else {
  Accounts.create(newAccount)
    .then((account) => {
      res.status(201).json(account);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error creating the account",
      });
    });
});

router.put("/:id", checkAccountId, (req, res, next) => {
  const id = req.params.id;
  const update = req.body;
  Accounts.updateById(id, update)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error updating the user",
      });
    });
});

router.delete("/:id", checkAccountId, async (req, res, next) => {
  try {
    const deleteAccount = await Accounts.deleteById(req.params.id);
    res.status(200).json(req.account);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: "something died",
    error: err.message,
  });
});

module.exports = router;
