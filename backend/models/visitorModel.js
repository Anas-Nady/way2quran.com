const mongoose = require("mongoose");

const visitorSchema = mongoose.Schema({
  ipAddress: { type: String, required: true },
  visitDate: { type: Date, default: Date.now },
  userAgent: { type: String },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;
