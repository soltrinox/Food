const redis = require("redis");
const { promisify } = require("util");

const redisClient = redis.createClient({
  host: "127.0.0.1", // default host
  port: 6379, // default port
});

const GET_ASYNC = promisify(redisClient.get).bind(redisClient);
const SET_ASYNC = promisify(redisClient.set).bind(redisClient);

module.exports = { GET_ASYNC, SET_ASYNC };
