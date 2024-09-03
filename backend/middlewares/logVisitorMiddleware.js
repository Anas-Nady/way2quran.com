const Visitor = require("./../models/visitorModel.js");

const logVisitor = async (req, res, next) => {
  try {
    const ipAddress =
      req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"];

    const uniqueIdentifier = `${ipAddress}-${userAgent}`;

    const existingVisitor = await Visitor.findOne({ uniqueIdentifier });

    if (!existingVisitor) {
      await Visitor.create({ ipAddress, userAgent, uniqueIdentifier });
    } else {
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
