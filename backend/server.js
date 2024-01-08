const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const seeder = require("./seeder.js");

dotenv.config({ path: "./../.env" });

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();
const app = require("./app");

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 8800;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
