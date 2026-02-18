const express = require("express");
const cors = require("cors");

const authorRoutes = require("./routes/authors");
const withdrawalRoutes = require("./routes/withdrawals");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/authors", authorRoutes);
app.use("/withdrawals", withdrawalRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Author Royalty API Running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});