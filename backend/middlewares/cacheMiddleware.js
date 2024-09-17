const redisClient = require("./../config/redisClient");
const asyncHandler = require("express-async-handler");

const cacheMiddleware = asyncHandler(async (req, res, next) => {
  const reciterSlug = req.params.reciterSlug;

  // check if the reciter's content is in the cache
  const cachedReciter = (await redisClient.get(reciterSlug)) || null;

  if (cachedReciter !== null) {
    res.send(JSON.parse(cachedReciter));
  } else {
    next();
  }
});

module.exports = cacheMiddleware;
