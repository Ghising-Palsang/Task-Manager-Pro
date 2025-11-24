const express = require("express");
const router = require("./router.config");
require("../config/mongodb.config");

const app = express();
app.use(express.json());

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
