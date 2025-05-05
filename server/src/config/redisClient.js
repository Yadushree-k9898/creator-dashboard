// const Redis = require('ioredis');
// require('dotenv').config();

// let isConnected = false;

// // Ensure you're using Redis Cloud connection URL
// const redisClient = new Redis(process.env.REDIS_URL, {
//   retryStrategy: (times) => {
//     console.warn(`🔁 Redis reconnect attempt #${times}`);
//     // Exponential backoff strategy
//     return Math.min(times * 50, 2000); // Maximum delay of 2 seconds
//   },
//   reconnectOnError: (err) => {
//     console.error('❌ Redis reconnecting due to error:', err);
//     return true; // Allow reconnection
//   },
//   tls: process.env.REDIS_TLS === 'true' ? {} : undefined, // Enable TLS if specified in .env
// });

// // Event listeners for Redis client
// redisClient.on('error', (err) => {
//   console.error('❌ Redis error:', err);
//   isConnected = false;
// });

// redisClient.on('connect', () => {
//   console.log('✅ Redis is connected');
//   isConnected = true;
// });

// redisClient.on('reconnecting', () => {
//   console.log('🔄 Redis reconnecting...');
// });

// // Ensure Redis connection before performing operations
// async function ensureConnection() {
//   if (redisClient.status !== 'ready') {
//     console.log('🔌 Connecting to Redis...');
//     try {
//       await redisClient.connect();
//     } catch (err) {
//       console.error('❌ Redis connection failed:', err);
//       throw new Error('Redis connection failed');
//     }
//   }
// }

// // Gracefully handle SIGINT and SIGTERM to close Redis connection
// process.on('SIGINT', async () => {
//   console.log('⚠️ Closing Redis connection...');
//   try {
//     await redisClient.quit();
//     console.log('✅ Redis connection closed');
//   } catch (err) {
//     console.error('❌ Error closing Redis connection:', err);
//   }
//   process.exit();
// });

// process.on('SIGTERM', async () => {
//   console.log('⚠️ Closing Redis connection due to SIGTERM...');
//   try {
//     await redisClient.quit();
//     console.log('✅ Redis connection closed');
//   } catch (err) {
//     console.error('❌ Error closing Redis connection:', err);
//   }
//   process.exit();
// });

// // Utility: Get data from Redis cache by key
// const getCache = async (key) => {
//   await ensureConnection();
//   try {
//     const data = await redisClient.get(key);
//     return data ? JSON.parse(data) : null;
//   } catch (err) {
//     console.error(`❌ Error getting cache for key "${key}":`, err);
//     return null;
//   }
// };

// // Utility: Set data to Redis cache with optional TTL (default 1 hour)
// const setCache = async (key, value, ttl = 3600) => {
//   await ensureConnection();
//   try {
//     await redisClient.set(key, JSON.stringify(value), 'EX', ttl); // 'EX' option for expiration (TTL in seconds)
//   } catch (err) {
//     console.error(`❌ Error setting cache for key "${key}":`, err);
//   }
// };

// // Utility: Delete cache by key
// const deleteCache = async (key) => {
//   await ensureConnection();
//   try {
//     await redisClient.del(key);
//     console.log(`✅ Cache for key "${key}" deleted.`);
//   } catch (err) {
//     console.error(`❌ Error deleting cache for key "${key}":`, err);
//   }
// };

// // Utility: Check if the cache exists for a key
// const existsCache = async (key) => {
//   await ensureConnection();
//   try {
//     const exists = await redisClient.exists(key);
//     return exists === 1;  // Redis returns 1 if the key exists, 0 if it doesn't
//   } catch (err) {
//     console.error(`❌ Error checking cache for key "${key}":`, err);
//     return false;
//   }
// };

// // Utility: Get all keys in Redis
// const getAllKeys = async () => {
//   await ensureConnection();
//   try {
//     const keys = await redisClient.keys('*');
//     return keys;
//   } catch (err) {
//     console.error('❌ Error getting all Redis keys:', err);
//     return [];
//   }
// };


// module.exports = {
//   redisClient,
//   getCache,
//   setCache,
//   deleteCache,
//   existsCache,
//   getAllKeys,
//   ensureConnection,
// };


const Redis = require('ioredis');
require('dotenv').config();

let isConnected = false;

const redisClient = new Redis(process.env.REDIS_URL, {
  retryStrategy: (times) => {
    console.warn(`🔁 Redis reconnect attempt #${times}`);
    return Math.min(times * 50, 2000); // Exponential backoff with max 2s
  },
  reconnectOnError: (err) => {
    console.error('❌ Redis reconnecting due to error:', err);
    return true;
  },
  tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
});

// Redis status events
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

// Ensures Redis is connected
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
    await new Promise((res) => setTimeout(res, 500)); // Small delay
  }
}

// Graceful shutdown
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

// Redis utilities
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
      ttl = 3600; // fallback default
    }
    await redisClient.set(key, JSON.stringify(value), 'EX', parseInt(ttl));
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
