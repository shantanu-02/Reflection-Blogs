import express from "express";
import cookieParser from "cookie-parser";
import postRoutes from "../api/routes/posts.js";
import userRoutes from "../api/routes/users.js";
import cors from "cors"
import { register } from "./controllers/register.js";
import { login } from "./controllers/login.js";
import { logout } from "./controllers/logout.js";
import multer from "multer";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();
const isDev = process.env.NODE_ENV === "development"; 
const URL = isDev
  ? "http://localhost:5137"
  : "https://reflection-blogs.vercel.app";

app.use(express.json());
app.use(cors({ origin: URL }));
app.use(cookieParser());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file?.filename);
});

app.use("/test", (req, res)=>{
    res.json("abc works")
    // db.query("INSERT INTO users (`username`, `email`, `password`) VALUES ('abc','abc@mail','123')", (err, result) => {
    //   if (err){
    //     console.log(err)
    //   }else{
    //     console.log(result)
    //   }
    // })
  })

app.use("/api/register", cors(), register);
app.use("/api/login", cors(), login);
app.use("/api/logout", cors(), logout);
app.use("/api/posts", cors(), postRoutes);
app.use("/api/users", cors(), userRoutes);

app.listen(8000, () => {
  console.log("connected !");
})