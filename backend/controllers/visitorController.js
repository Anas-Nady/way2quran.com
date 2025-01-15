const Visitor = require("./../models/visitorModel.js");
const asyncHandler = require("express-async-handler");

const getDateRanges = () => {
  const now = new Date();

  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date(now);
  todayEnd.setHours(23, 59, 59, 999);

  const monthlyStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const monthlyEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  monthlyEnd.setHours(23, 59, 59, 999);

  const dayOfMonth = now.getDate();
  const weekIndex = Math.floor((dayOfMonth - 1) / 7);

  const weeklyStart = new Date(monthlyStart);
  weeklyStart.setDate(1 + weekIndex * 7);
  weeklyStart.setHours(0, 0, 0, 0);

  const weeklyEnd = new Date(weeklyStart);
  weeklyEnd.setDate(weeklyStart.getDate() + 6);
  weeklyEnd.setHours(23, 59, 59, 999);

  if (weeklyEnd > monthlyEnd) {
    weeklyEnd.setTime(monthlyEnd.getTime());
  }

  const yearlyStart = new Date(now.getFullYear(), 0, 1);

  const yearlyEnd = new Date(now.getFullYear(), 11, 31);
  yearlyEnd.setHours(23, 59, 59, 999);

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

exports.logVisitorTracking = asyncHandler(async (req, res) => {
  const ipAddress =
    req.query.userIP || req.headers["x-forwarded-for"] || req.ip;

  const visitorId = req.query.visitorId;
  const userAgent = req.headers["user-agent"];

  await Visitor.create({ ipAddress, userAgent, visitorId });

  res.status(200).json({ message: "success" });
});
