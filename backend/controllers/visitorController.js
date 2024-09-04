const Visitor = require("./../models/visitorModel.js");
const asyncHandler = require("express-async-handler");

const getDateRanges = () => {
  const now = new Date();

  const todayStart = new Date().setHours(0, 0, 0, 0);
  const todayEnd = new Date().setHours(23, 59, 59, 999);

  const weeklyStart = new Date(
    now.setDate(now.getDate() - now.getDay())
  ).setHours(0, 0, 0, 0);
  const weeklyEnd = new Date(
    now.setDate(now.getDate() - now.getDay() + 6)
  ).setHours(23, 59, 59, 999);

  const monthlyStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthlyEnd = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).setHours(23, 59, 59, 999);

  const yearlyStart = new Date(now.getFullYear(), 0, 1);
  const yearlyEnd = new Date(now.getFullYear(), 11, 31).setHours(
    23,
    59,
    59,
    999
  );

  return {
    today: { start: todayStart, end: todayEnd },
    weekly: { start: weeklyStart, end: weeklyEnd },
    monthly: { start: monthlyStart, end: monthlyEnd },
    yearly: { start: yearlyStart, end: yearlyEnd },
  };
};

exports.getVisitorCount = asyncHandler(async (req, res) => {
  const ranges = getDateRanges();

  // Count documents within each date range
  const todayCount = await Visitor.countDocuments({
    visitDate: { $gte: ranges.today.start, $lt: ranges.today.end },
  });

  const weeklyCount = await Visitor.countDocuments({
    visitDate: { $gte: ranges.weekly.start, $lt: ranges.weekly.end },
  });

  const monthlyCount = await Visitor.countDocuments({
    visitDate: { $gte: ranges.monthly.start, $lt: ranges.monthly.end },
  });

  const yearlyCount = await Visitor.countDocuments({
    visitDate: { $gte: ranges.yearly.start, $lt: ranges.yearly.end },
  });

  // Count all documents for the total count
  const totalCount = await Visitor.countDocuments({});

  res.json({
    today: todayCount,
    weekly: weeklyCount,
    monthly: monthlyCount,
    yearly: yearlyCount,
    total: totalCount,
  });
});
