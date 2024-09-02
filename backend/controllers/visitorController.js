const Visitor = require("./../models/visitorModel.js");
const asyncHandler = require("express-async-handler");

const getDateRange = (range) => {
  const now = new Date();
  let start, end;

  switch (range) {
    case "today":
      start = new Date().setHours(0, 0, 0, 0);
      end = new Date().setHours(23, 59, 59, 999);
      break;
    case "weekly":
      start = new Date(now.setDate(now.getDate() - now.getDay())).setHours(
        0,
        0,
        0,
        0
      );
      end = new Date(now.setDate(now.getDate() - now.getDay() + 6)).setHours(
        23,
        59,
        59,
        999
      );
      break;
    case "monthly":
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0).setHours(
        23,
        59,
        59,
        999
      );
      break;
    case "yearly":
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31).setHours(23, 59, 59, 999);
      break;
    case "total":
      // No date range for total
      start = 0; // Unused
      end = Date.now(); // Unused
      break;
    default:
      throw new Error("Invalid date range");
  }

  return { start, end };
};

exports.getVisitorCount = asyncHandler(async (req, res) => {
  const { range } = req.params; // 'today', 'weekly', 'monthly', 'yearly', 'total'
  const { start, end } = getDateRange(range);

  let visitorCount;
  if (range === "total") {
    // Count all documents if range is 'total'
    visitorCount = await Visitor.countDocuments({});
  } else {
    // Count documents within date range for other cases
    visitorCount = await Visitor.countDocuments({
      visitDate: { $gte: start, $lt: end },
    });
  }

  res.json({ visitorCount });
});
