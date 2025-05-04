// const Redis = require('ioredis');
// require('dotenv').config();

// let isConnected = false;

// // Create a new Redis client
// const redisClient = new Redis({
//   host: process.env.REDIS_HOST || 'localhost',
//   port: process.env.REDIS_PORT || 6379,
//   password: process.env.REDIS_PASSWORD || undefined,
//   db: process.env.REDIS_DB || 0,
//   retryStrategy: (times) => {
//     console.warn(`🔁 Redis reconnect attempt #${times}`);
//     // Exponential backoff strategy with a maximum delay of 2 seconds
//     return Math.min(times * 50, 2000);
//   },
//   reconnectOnError: (err) => {
//     console.error('❌ Redis reconnecting due to error:', err);
//     return true;
//   },
//   tls: process.env.REDIS_TLS === 'true' ? {} : undefined, // Enable TLS if specified
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
//     await redisClient.set(key, JSON.stringify(value), 'EX', ttl); // TTL in seconds
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
//     return exists === 1;
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

// // Export the Redis client functions
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

// Ensure you're using Redis Cloud connection URL
const redisClient = new Redis(process.env.REDIS_URL, {
  retryStrategy: (times) => {
    console.warn(`🔁 Redis reconnect attempt #${times}`);
    // Exponential backoff strategy
    return Math.min(times * 50, 2000); // Maximum delay of 2 seconds
  },
  reconnectOnError: (err) => {
    console.error('❌ Redis reconnecting due to error:', err);
    return true; // Allow reconnection
  },
  tls: process.env.REDIS_TLS === 'true' ? {} : undefined, // Enable TLS if specified in .env
});

// Event listeners for Redis client
redisClient.on('error', (err) => {
  console.error('❌ Redis error:', err);
  isConnected = false;
});

redisClient.on('connect', () => {
  console.log('✅ Redis is connected');
  isConnected = true;
});

redisClient.on('reconnecting', () => {
  console.log('🔄 Redis reconnecting...');
});

// Ensure Redis connection before performing operations
async function ensureConnection() {
  if (redisClient.status !== 'ready') {
    console.log('🔌 Connecting to Redis...');
    try {
      await redisClient.connect();
    } catch (err) {
      console.error('❌ Redis connection failed:', err);
    }
  }
}

// Gracefully handle SIGINT and SIGTERM to close Redis connection
process.on('SIGINT', async () => {
  console.log('⚠️ Closing Redis connection...');
  try {
    await redisClient.quit();
    console.log('✅ Redis connection closed');
  } catch (err) {
    console.error('❌ Error closing Redis connection:', err);
  }
  process.exit();
});

process.on('SIGTERM', async () => {
  console.log('⚠️ Closing Redis connection due to SIGTERM...');
  try {
    await redisClient.quit();
    console.log('✅ Redis connection closed');
  } catch (err) {
    console.error('❌ Error closing Redis connection:', err);
  }
  process.exit();
});

// Utility: Get data from Redis cache by key
const getCache = async (key) => {
  await ensureConnection();
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error(`❌ Error getting cache for key "${key}":`, err);
    return null;
  }
};

// Utility: Set data to Redis cache with optional TTL (default 1 hour)
const setCache = async (key, value, ttl = 3600) => {
  await ensureConnection();
  try {
    await redisClient.set(key, JSON.stringify(value), 'EX', ttl); // 'EX' option for expiration (TTL in seconds)
  } catch (err) {
    console.error(`❌ Error setting cache for key "${key}":`, err);
  }
};

// Utility: Delete cache by key
const deleteCache = async (key) => {
  await ensureConnection();
  try {
    await redisClient.del(key);
    console.log(`✅ Cache for key "${key}" deleted.`);
  } catch (err) {
    console.error(`❌ Error deleting cache for key "${key}":`, err);
  }
};

// Utility: Check if the cache exists for a key
const existsCache = async (key) => {
  await ensureConnection();
  try {
    const exists = await redisClient.exists(key);
    return exists === 1;
  } catch (err) {
    console.error(`❌ Error checking cache for key "${key}":`, err);
    return false;
  }
};

// Utility: Get all keys in Redis
const getAllKeys = async () => {
  await ensureConnection();
  try {
    const keys = await redisClient.keys('*');
    return keys;
  } catch (err) {
    console.error('❌ Error getting all Redis keys:', err);
    return [];
  }
};

// Export the Redis client functions
module.exports = {
  redisClient,
  getCache,
  setCache,
  deleteCache,
  existsCache,
  getAllKeys,
  ensureConnection,
};
