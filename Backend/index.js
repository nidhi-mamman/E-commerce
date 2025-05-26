const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const UserRouter = require("./router/user.js");
const ProductRouter=require('./router/product.js')
const connectDB = require("./config/db.js");
const PORT = process.env.PORT;

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://e-commerce-ui-1iel.onrender.com"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

//Image storage engine
const storage=multer.diskStorage({
  destination:function(req,file,cb){
    return cb(null,"./uploads")
  },
  filename:function(req,file,cb){
    return cb(null,`${Date.now()}-${file.originalname}`)
  }
})

const upload=multer({storage})

app.post("/upload", (req, res, next) => {
  upload.single("product")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error("Multer Error:", err.message);
      return res.status(500).send(`Multer error: ${err.message}`);
    } else if (err) {
      console.error("Unexpected Error:", err.message);
      return res.status(500).send(`Unexpected error: ${err.message}`);
    }
    if (!req.file) {
      console.error("No file uploaded");
      return res.status(400).send("No file uploaded");
    }
    console.log("File uploaded:", req.file);

    res.json({
      success:1,
      image_url:`http://localhost:${PORT}/images/${req.file.filename}`
    })
  });
});

app.use("/api", UserRouter);
app.use('/product',ProductRouter)

connectDB();

app.listen(PORT, () => {
  console.log("Server listening on port 5000");
});
