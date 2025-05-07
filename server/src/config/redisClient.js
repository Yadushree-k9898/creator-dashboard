// const Redis = require('ioredis');
// require('dotenv').config();

// let isConnected = false;

// const redisClient = new Redis(process.env.REDIS_URL, {
//   retryStrategy: (times) => {
//     console.warn(`🔁 Redis reconnect attempt #${times}`);
//     return Math.min(times * 50, 2000);
//   },
//   reconnectOnError: (err) => {
//     console.error('❌ Redis reconnecting due to error:', err);
//     return true;
//   },
//   tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
// });

// redisClient.on('connect', () => {
//   console.log('✅ Redis connected');
//   isConnected = true;
// });

// redisClient.on('error', (err) => {
//   console.error('❌ Redis error:', err.message);
//   isConnected = false;
// });

// redisClient.on('reconnecting', () => {
//   console.log('🔄 Redis reconnecting...');
// });

// async function ensureConnection() {
//   if (redisClient.status === 'end' || redisClient.status === 'close') {
//     console.warn(`🔌 Redis status: ${redisClient.status}, reconnecting...`);
//     try {
//       await redisClient.connect();
//     } catch (err) {
//       console.error('❌ Redis reconnection failed:', err.stack);
//       throw new Error('Redis connection failed');
//     }
//   } else if (redisClient.status !== 'ready') {
//     console.warn(`⚠️ Redis not ready, current status: ${redisClient.status}`);
//     await new Promise((res) => setTimeout(res, 500));
//   }
// }

// async function gracefulShutdown(signal) {
//   console.log(`⚠️ Shutting down Redis on ${signal}...`);
//   try {
//     await redisClient.quit();
//     console.log('✅ Redis connection closed');
//   } catch (err) {
//     console.error('❌ Error closing Redis:', err.message);
//   }
//   process.exit();
// }

// process.on('SIGINT', () => gracefulShutdown('SIGINT'));
// process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// const getCache = async (key) => {
//   await ensureConnection();
//   try {
//     const data = await redisClient.get(key);
//     return data ? JSON.parse(data) : null;
//   } catch (err) {
//     console.error(`❌ getCache failed for key "${key}":`, err.message);
//     return null;
//   }
// };

// const setCache = async (key, value, ttl = 3600) => {
//   await ensureConnection();
//   try {
//     if (typeof ttl !== 'number' || isNaN(ttl) || ttl <= 0) {
//       ttl = 3600;
//     }
//     const result = await redisClient.set(key, JSON.stringify(value), 'EX', parseInt(ttl));
//     console.log(`➡️ Cached key "${key}" for ${ttl}s: result=${result}`);
//   } catch (err) {
//     console.error(`❌ setCache failed for key "${key}":`, err.message);
//   }
// };

// const deleteCache = async (key) => {
//   await ensureConnection();
//   try {
//     await redisClient.del(key);
//     console.log(`🗑️ Cache deleted for key "${key}"`);
//   } catch (err) {
//     console.error(`❌ deleteCache failed for key "${key}":`, err.message);
//   }
// };

// const existsCache = async (key) => {
//   await ensureConnection();
//   try {
//     const exists = await redisClient.exists(key);
//     return exists === 1;
//   } catch (err) {
//     console.error(`❌ existsCache failed for key "${key}":`, err.message);
//     return false;
//   }
// };

// const getAllKeys = async () => {
//   await ensureConnection();
//   try {
//     return await redisClient.keys('*');
//   } catch (err) {
//     console.error('❌ getAllKeys failed:', err.message);
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
    return Math.min(times * 50, 2000); // Retry strategy with exponential backoff
  },
  reconnectOnError: (err) => {
    console.error('❌ Redis reconnecting due to error:', err);
    return true; // Reconnect on error
  },
  tls: process.env.REDIS_TLS === 'true' ? {} : undefined, // TLS configuration
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

redisClient.on('ready', () => {
  console.log('✅ Redis is ready');
});

redisClient.on('end', () => {
  console.log('❌ Redis connection closed');
});

// Ensures connection to Redis before performing any actions
async function ensureConnection() {
  if (redisClient.status === 'end' || redisClient.status === 'close') {
    console.warn(`🔌 Redis status: ${redisClient.status}, reconnecting...`);
    try {
      await redisClient.connect(); // Connect if disconnected
    } catch (err) {
      console.error('❌ Redis reconnection failed:', err.stack);
      throw new Error('Redis connection failed');
    }
  } else if (redisClient.status !== 'ready') {
    console.warn(`⚠️ Redis not ready, current status: ${redisClient.status}`);
    await new Promise((res) => setTimeout(res, 500)); // Wait and retry
  }
}

// Gracefully handle shutdown signals
async function gracefulShutdown(signal) {
  console.log(`⚠️ Shutting down Redis on ${signal}...`);
  try {
    await redisClient.quit(); // Close the Redis connection
    console.log('✅ Redis connection closed');
  } catch (err) {
    console.error('❌ Error closing Redis:', err.message);
  }
  process.exit();
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Get data from the cache
const getCache = async (key) => {
  await ensureConnection(); // Ensure connection to Redis
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error(`❌ getCache failed for key "${key}":`, err.message);
    return null; // Return null in case of error
  }
};

// Set data in the cache with TTL (Time to Live)
const setCache = async (key, value, ttl = 3600) => {
  await ensureConnection(); // Ensure connection to Redis
  try {
    if (typeof ttl !== 'number' || isNaN(ttl) || ttl <= 0) {
      ttl = 3600; // Default TTL of 1 hour
    }
    const result = await redisClient.set(key, JSON.stringify(value), 'EX', ttl); // Store value in Redis with TTL
    console.log(`➡️ Cached key "${key}" for ${ttl}s: result=${result}`);
  } catch (err) {
    console.error(`❌ setCache failed for key "${key}":`, err.message);
  }
};

// Delete a key from the cache
const deleteCache = async (key) => {
  await ensureConnection(); // Ensure connection to Redis
  try {
    await redisClient.del(key);
    console.log(`🗑️ Cache deleted for key "${key}"`);
  } catch (err) {
    console.error(`❌ deleteCache failed for key "${key}":`, err.message);
  }
};

// Check if a key exists in the cache
const existsCache = async (key) => {
  await ensureConnection(); // Ensure connection to Redis
  try {
    const exists = await redisClient.exists(key);
    return exists === 1; // Returns true if the key exists
  } catch (err) {
    console.error(`❌ existsCache failed for key "${key}":`, err.message);
    return false; // Return false if error occurs
  }
};

// Get all keys in the Redis store
const getAllKeys = async () => {
  await ensureConnection(); // Ensure connection to Redis
  try {
    return await redisClient.keys('*'); // Get all keys
  } catch (err) {
    console.error('❌ getAllKeys failed:', err.message);
    return []; // Return empty array on error
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
