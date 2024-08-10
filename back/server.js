const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

let items = [
  { id: 1, name: "item 1", description: "description item 1" },
  { id: 2, name: "item 2", description: "description item 2" },
];

// Used to auto increment the item ID
let index = items.length;

app.get("/api/items", (req, res) => {
  res.json(items);
});

app.post("/api/items", (req, res) => {
  index++;
  const newItem = { ...req.body, id: index };
  items.push(newItem);
  res.status(201).json(newItem);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
