const express = require("express");
const router = express.Router();

const { authors, withdrawals } = require("../data/seed");
const { calculateAuthorEarnings } = require("../utils/calculations");

router.post("/", (req, res) => {
  const { author_id, amount } = req.body;

  const author = authors.find(a => a.id === author_id);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  if (amount < 500) {
    return res.status(400).json({ error: "Minimum withdrawal is ₹500" });
  }

  const { currentBalance } = calculateAuthorEarnings(author_id);

  if (amount > currentBalance) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  const newWithdrawal = {
    id: withdrawals.length + 1,
    author_id,
    amount,
    status: "pending",
    created_at: new Date().toISOString()
  };

  withdrawals.push(newWithdrawal);

  const { currentBalance: newBalance } = calculateAuthorEarnings(author_id);

  res.status(201).json({
    ...newWithdrawal,
    new_balance: newBalance
  });
});

module.exports = router;