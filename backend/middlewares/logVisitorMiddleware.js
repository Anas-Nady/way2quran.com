const Visitor = require("./../models/visitorModel.js");

const logVisitor = async (req, res, next) => {
  try {
    const ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"];

    const existingVisitor = await Visitor.findOne({ ipAddress });

    if (!existingVisitor) {
      // If the IP address is not found, create a new visitor entry
      await Visitor.create({ ipAddress, userAgent });
    } else {
      // If the IP address exists, update the visitDate
      existingVisitor.visitDate = Date.now();
      await existingVisitor.save();
    }

    next();
  } catch (error) {
    console.error("Error logging visitor:", error);
    next();
  }
};

module.exports = logVisitor;
