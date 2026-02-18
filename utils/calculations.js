const { books, sales, withdrawals } = require("../data/seed");

function calculateAuthorEarnings(authorId) {
  const authorBooks = books.filter(b => b.author_id === authorId);

  let totalEarnings = 0;

  authorBooks.forEach(book => {
    const bookSales = sales.filter(s => s.book_id === book.id);
    bookSales.forEach(sale => {
      totalEarnings += sale.quantity * book.royalty_per_sale;
    });
  });

  const totalWithdrawals = withdrawals
    .filter(w => w.author_id === authorId)
    .reduce((sum, w) => sum + w.amount, 0);

  return {
    totalEarnings,
    currentBalance: totalEarnings - totalWithdrawals
  };
}

module.exports = {
  calculateAuthorEarnings
};