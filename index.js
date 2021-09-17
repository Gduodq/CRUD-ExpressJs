const express = require("express");
const { routes } = require("./routes");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded());

routes.forEach((route) => {
  const { path, method, handleRoute } = route;
  app[method](path, handleRoute);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
