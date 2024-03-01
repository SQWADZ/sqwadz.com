import Redis from 'ioredis';

const redis = new Redis({
  host: 'db.sqwadz.com',
  password: process.env.REDIS_PASSWORD,
});

export default redis;
