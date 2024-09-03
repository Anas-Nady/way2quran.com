const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  ipAddress: { type: String, required: true },
  userAgent: { type: String, required: true },
  uniqueIdentifier: { type: String, required: true, unique: true },
  visitDate: { type: Date, default: Date.now },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;
