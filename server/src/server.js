const Route = require("./routers/index");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Route(app);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on " + process.env.PORT + "...");
});
