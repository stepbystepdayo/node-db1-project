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
  res.status(200).json(req.account);
});

router.post("/", (req, res, next) => {
  // DO YOUR MAGIC
});

router.put("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: "something died",
    error: err.message,
  });
});

module.exports = router;
