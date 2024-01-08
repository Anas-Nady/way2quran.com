const express = require("express");
const path = require("path");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError.js");
const userRouter = require("./routes/userRoute");
const reciterRouter = require("./routes/reciterRoute");
const surahRouter = require("./routes/surahRoute");
const messageRouter = require("./routes/messageRoute");
const recitationRouter = require("./routes/recitationRoute.js");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const app = express();

// Global Middleware
app.set("trust proxy", 1);
// Limit request from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again later.",
  trustProxy: true,
});
app.use("/api", limiter);

// Serve static files
app.use(express.static(path.resolve(__dirname, "../client", "dist")));

// development logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Body parsing, reading data from body into req.body
app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// Data sanitization against NoSQl query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use("/api/auth", userRouter);
app.use("/api/reciters", reciterRouter);
app.use("/api/surah", surahRouter);
app.use("/api/recitations", recitationRouter);
app.use("/api/messages", messageRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
