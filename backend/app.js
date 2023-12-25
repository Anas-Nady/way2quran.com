const express = require("express");
const path = require("path");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError.js");
const userRouter = require("./routes/userRoute");
const reciterRouter = require("./routes/reciterRoute");
const surahRouter = require("./routes/surahRoute");
const messageRouter = require("./routes/messageRoute");
const frequentRecitationRouter = require("./routes/frequentRecitationRoute.js");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.static(__dirname + "/client/dist"));

// Serve static files
app.use(express.static(path.resolve(__dirname, "../client/dist")));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json({ limit: "5mb" })); // Adjust the limit as needed
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRouter);
app.use("/api/reciters", reciterRouter);
app.use("/api/surah", surahRouter);
app.use("/api/frequent-recitations", frequentRecitationRouter);
app.use("/api/messages", messageRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
