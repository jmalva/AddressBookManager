const redisClient = require( '../integrations/redis' );

const { REDIS_URL } = process.env;

module.exports = redisClient( REDIS_URL );
