const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const UserRouter = require("./router/user.js");
const connectDB = require("./config/db.js");

const app = express();


const corsOptions = {
  origin: ["http://localhost:5173","https://shopify-927t.onrender.com"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json())

app.use("/api", UserRouter);

connectDB();

let PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server listening on port 5000");
});
