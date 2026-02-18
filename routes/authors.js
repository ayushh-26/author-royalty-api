const express = require("express");
const router = express.Router();

const { authors, books, sales, withdrawals } = require("../data/seed");
const { calculateAuthorEarnings } = require("../utils/calculations");

/* GET /authors */
router.get("/", (req, res) => {
  const result = authors.map(author => {
    const { totalEarnings, currentBalance } = calculateAuthorEarnings(author.id);
    return {
      id: author.id,
      name: author.name,
      total_earnings: totalEarnings,
      current_balance: currentBalance
    };
  });

  res.json(result);
});

/* GET /authors/:id */
router.get("/:id", (req, res) => {
  const authorId = parseInt(req.params.id);
  const author = authors.find(a => a.id === authorId);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const authorBooks = books.filter(b => b.author_id === authorId);

  const booksData = authorBooks.map(book => {
    const bookSales = sales.filter(s => s.book_id === book.id);
    const totalSold = bookSales.reduce((sum, s) => sum + s.quantity, 0);
    const totalRoyalty = totalSold * book.royalty_per_sale;

    return {
      id: book.id,
      title: book.title,
      royalty_per_sale: book.royalty_per_sale,
      total_sold: totalSold,
      total_royalty: totalRoyalty
    };
  });

  const { totalEarnings, currentBalance } = calculateAuthorEarnings(authorId);

  res.json({
    id: author.id,
    name: author.name,
    email: author.email,
    total_earnings: totalEarnings,
    current_balance: currentBalance,
    total_books: authorBooks.length,
    books: booksData
  });
});

/* GET /authors/:id/sales */
router.get("/:id/sales", (req, res) => {
  const authorId = parseInt(req.params.id);
  const author = authors.find(a => a.id === authorId);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const authorBooks = books.filter(b => b.author_id === authorId);
  const bookIds = authorBooks.map(b => b.id);

  const authorSales = sales
    .filter(s => bookIds.includes(s.book_id))
    .map(sale => {
      const book = books.find(b => b.id === sale.book_id);
      return {
        book_title: book.title,
        quantity: sale.quantity,
        royalty_earned: sale.quantity * book.royalty_per_sale,
        sale_date: sale.sale_date
      };
    })
    .sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date));

  res.json(authorSales);
});

/* GET /authors/:id/withdrawals */
router.get("/:id/withdrawals", (req, res) => {
  const authorId = parseInt(req.params.id);
  const author = authors.find(a => a.id === authorId);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const authorWithdrawals = withdrawals
    .filter(w => w.author_id === authorId)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  res.json(authorWithdrawals);
});

module.exports = router;