import rateLimit from "express-rate-limit";

type RateLimitOptions = {
  windowMinutes: number;
  maxRequests: number;
};

const createRateLimiter = function ({
  windowMinutes,
  maxRequests,
}: RateLimitOptions) {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000, // convert minutes to milliseconds
    max: maxRequests,
    handler: (req, res, next) => {
      res.status(429).json({
        status: "fail",
        message: "Too many requests, please try again later.",
      });
    },
  });
};
export default createRateLimiter;
