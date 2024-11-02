const express = require("express");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError.js");
const visitorRouter = require("./routes/visitorRoute");
const searchRouter = require("./routes/searchRoute");
const downloadTrackingRouter = require("./routes/downloadTrackingRoute.js");
const userRouter = require("./routes/userRoute");
const reciterRouter = require("./routes/reciterRoute");
const recitationRouter = require("./routes/recitationRoute.js");
const surahRouter = require("./routes/surahRoute");
const messageRouter = require("./routes/messageRoute");
const restartRouter = require("./routes/restartRoute.js");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const app = express();

app.set("trust proxy", 1);
// Limit request from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again later.",
  trustProxy: true,
});
app.use("/api", limiter);

const corsOptions = {
  origin: [process.env.CLIENT_URL],
  methods: "GET,PUT,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// development logging
if (process.env.NODE_ENV !== "PRODUCTION") {
  app.use(morgan("dev"));
}

// Body parsing, reading data from body into req.body
app.use(cookieParser());
app.use(express.json({ limit: "2gb" }));
app.use(express.urlencoded({ extended: true, limit: "2gb" }));

// Data sanitization against NoSQl query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use("/api/visitors", visitorRouter);
app.use("/api/search", searchRouter);
app.use("/api/download", downloadTrackingRouter);
app.use("/api/auth", userRouter);
app.use("/api/reciters", reciterRouter);
app.use("/api/surah", surahRouter);
app.use("/api/recitations", recitationRouter);
app.use("/api/messages", messageRouter);
app.use("/api/restart-server", restartRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
