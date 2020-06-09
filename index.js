const express = require("express");
const app = express();

let genres = [
  {
    id: 1,
    name: "horror",
  },
  {
    id: 2,
    name: "action",
  },
  {
    id: 3,
    name: "romance",
  },
  {
    id: 4,
    name: "science",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === +req.params["id"]);

  if (!genre) return res.status(404).send("Genre for given id is not present");

  res.send(genre);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
