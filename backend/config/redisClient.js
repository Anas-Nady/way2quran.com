const redis = require("redis");
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient(REDIS_PORT);

redisClient.connect().catch(console.error);

redisClient.on("error", (err) => {
  console.error(`Error connecting to Redis: ${err}`);
});

module.exports = redisClient;
