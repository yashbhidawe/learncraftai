const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const responseRouter = require("./routes/response");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", responseRouter);
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
