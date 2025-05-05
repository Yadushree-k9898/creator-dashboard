const Redis = require('ioredis');
require('dotenv').config();

let isConnected = false;

const redisClient = new Redis(process.env.REDIS_URL, {
  retryStrategy: (times) => {
    console.warn(`🔁 Redis reconnect attempt #${times}`);
    return Math.min(times * 50, 2000);
  },
  reconnectOnError: (err) => {
    console.error('❌ Redis reconnecting due to error:', err);
    return true;
  },
  tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
});

redisClient.on('connect', () => {
  console.log('✅ Redis connected');
  isConnected = true;
});

redisClient.on('error', (err) => {
  console.error('❌ Redis error:', err.message);
  isConnected = false;
});

redisClient.on('reconnecting', () => {
  console.log('🔄 Redis reconnecting...');
});

async function ensureConnection() {
  if (redisClient.status === 'end' || redisClient.status === 'close') {
    console.warn(`🔌 Redis status: ${redisClient.status}, reconnecting...`);
    try {
      await redisClient.connect();
    } catch (err) {
      console.error('❌ Redis reconnection failed:', err.stack);
      throw new Error('Redis connection failed');
    }
  } else if (redisClient.status !== 'ready') {
    console.warn(`⚠️ Redis not ready, current status: ${redisClient.status}`);
    await new Promise((res) => setTimeout(res, 500));
  }
}

async function gracefulShutdown(signal) {
  console.log(`⚠️ Shutting down Redis on ${signal}...`);
  try {
    await redisClient.quit();
    console.log('✅ Redis connection closed');
  } catch (err) {
    console.error('❌ Error closing Redis:', err.message);
  }
  process.exit();
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

const getCache = async (key) => {
  await ensureConnection();
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error(`❌ getCache failed for key "${key}":`, err.message);
    return null;
  }
};

const setCache = async (key, value, ttl = 3600) => {
  await ensureConnection();
  try {
    if (typeof ttl !== 'number' || isNaN(ttl) || ttl <= 0) {
      ttl = 3600;
    }
    const result = await redisClient.set(key, JSON.stringify(value), 'EX', parseInt(ttl));
    console.log(`➡️ Cached key "${key}" for ${ttl}s: result=${result}`);
  } catch (err) {
    console.error(`❌ setCache failed for key "${key}":`, err.message);
  }
};

const deleteCache = async (key) => {
  await ensureConnection();
  try {
    await redisClient.del(key);
    console.log(`🗑️ Cache deleted for key "${key}"`);
  } catch (err) {
    console.error(`❌ deleteCache failed for key "${key}":`, err.message);
  }
};

const existsCache = async (key) => {
  await ensureConnection();
  try {
    const exists = await redisClient.exists(key);
    return exists === 1;
  } catch (err) {
    console.error(`❌ existsCache failed for key "${key}":`, err.message);
    return false;
  }
};

const getAllKeys = async () => {
  await ensureConnection();
  try {
    return await redisClient.keys('*');
  } catch (err) {
    console.error('❌ getAllKeys failed:', err.message);
    return [];
  }
};

module.exports = {
  redisClient,
  getCache,
  setCache,
  deleteCache,
  existsCache,
  getAllKeys,
  ensureConnection,
};
