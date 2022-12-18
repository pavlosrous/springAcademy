import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter} from "react-router-dom";
// import dotenv from "dotenv";
// import * as path from "path";
// import {fileURLToPath} from "url";
// import express from "express";
// import helmet from "helmet";
// import bodyParser from "body-parser";
// import cors from "cors";
// import multer from "multer";
// import {register} from "./controllers/auth.js";
//
// /* CONFIGURATIONS */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));
//
// /* FILE STORAGE */
// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, file.originalname);
//   },
//   filename(req, file, callback) {
//     callback(null, file.originalname);
//   },
// });
//
// /* ROUTES WITH FILES */
// app.post("/api/auth/register", upload.single("picture"), register);
//
// const upload = multer({ storage });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
