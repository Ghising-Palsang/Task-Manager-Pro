const cors = require("cors");
const express = require("express");
const router = require("./router.config");
const cookieParser = require("cookie-parser");
const { default: helmet } = require("helmet");
const { default: rateLimit } = require("express-rate-limit");
require("../config/mongodb.config");

const app = express();

// const corsOptions = {
//   origin: (origin, callback) => {
//     // allow local dev or any Vercel deployment
//     if (
//       !origin ||
//       origin.endsWith(".vercel.app") ||
//       origin === "http://localhost:5173/"
//     ) {
//       callback(null, origin || "http://localhost:5173/"); // Cors allowed
//     } else {
//       callback(null, false);
//     }
//   },
//   credentials: true,
// };

app.use(
  cors({
    origin: "https://task-manager-pro-eosin.vercel.app",
    credentials: true,
  }),
);
app.use(helmet());
// parse JSON body
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 60000,
    limit: 60,
  }),
);

// parse cookies
app.use(cookieParser());

app.use("/api/v1", router);

//404

app.use((req, res, next) => {
  next({
    code: 404,
    name: "RESOURCE_NOTFOUND",
    message: "Resource not found",
  });
});

// error handling
app.use((error, req, res, next) => {
  let detail = error.detail || null;
  let msg = error.message || "Internal Server error";
  let responseCode = error.code || 500;
  let status = error.name || "APPLICATION_ERR";

  if (error.name === "MongoServerError") {
    detail = {};
    responseCode = 400;
    msg = "Unique Validation Failed";
    status = "VALIDATION_FAILED";

    if (+error.code === 11000) {
      Object.keys(error.keyPattern).map((field) => {
        detail[field] = `${field} must be unique`;
      });
    }
  }

  res.status(responseCode).json({
    error: detail,
    message: msg,
    status: status,
    options: null,
  });
});

module.exports = app;
