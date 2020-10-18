const redis = require("redis");
const { promisify } = require("util");

const { REDIS_HOST, REDIS_PORT } = process.env;

// redis default host 127.0.0.1 and port 6379
const redisClient = redis.createClient({
  host: REDIS_HOST.toString(),
  port: REDIS_PORT,
});

const GET_ASYNC = promisify(redisClient.get).bind(redisClient);
const SET_ASYNC = promisify(redisClient.set).bind(redisClient);

module.exports = { GET_ASYNC, SET_ASYNC };
