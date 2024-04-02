const express = require("express");
const cors = require("cors");
const connection = require("./Db");
const routes = require("./routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", routes);

app.listen(process.env.PORT);

process.on("exit", () => {
  connection.end((err) => {
    if (err) {
      console.error("Error closing MySQL connection pool: ", err);
    } else {
      console.log("MySQL connection pool closed successfully");
    }
  });
});
