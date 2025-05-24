const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("../config/db");
const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    console.log("DB Connection successful! ");
    app.listen(PORT, () => {
      console.log(`"Server running on port ${PORT}"`);
    });
  })
  .catch((err) => {
    console.log(err, "Connection failed!");
  });
