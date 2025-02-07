import express from "express";
import globalErrorHandler from "./controllers/errorController";
import AppError from "./utils/appError";
import visitorRouter from "./routes/visitorRoute";
import searchRouter from "./routes/searchRoute";
import mushafRouter from "./routes/mushafRoute";
import userRouter from "./routes/userRoute";
import reciterRouter from "./routes/reciterRoute";
import recitationRouter from "./routes/recitationRoute";
import surahRouter from "./routes/surahRoute";
import messageRouter from "./routes/messageRoute";
import restartRouter from "./routes/restartRoute";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
// @ts-ignore
import xss from "xss-clean";

const app = express();

app.set("trust proxy", 1);
// Limit request from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

const corsOptions = {
  origin: process.env.CLIENT_URL,
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
app.use(express.json({ limit: "5gb" }));
app.use(express.urlencoded({ extended: true, limit: "5gb" }));

// Data sanitization against NoSQl query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use("/api/visitors", visitorRouter);
app.use("/api/search", searchRouter);
app.use("/api/mushaf", mushafRouter);
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

export default app;
