const { Pool } = require('pg');
const dns = require('dns').promises;
require('dotenv').config();

const dbUrl = process.env.DATABASE_URL || '';
const needsSsl = process.env.NODE_ENV === 'production' || dbUrl.includes('supabase') || dbUrl.includes('neon.tech');

let pool;

async function getPool() {
  if (pool) return pool;

  const config = {
    connectionString: dbUrl,
    ssl: needsSsl ? { rejectUnauthorized: false } : false,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 10,
  };

  // Workaround for ENOTFOUND errors on NeonDB in some networks
  if (dbUrl.includes('neon.tech')) {
    try {
      const url = new URL(dbUrl);
      const hostname = url.hostname;
      dns.setServers(['8.8.8.8', '8.8.4.4']);
      const addresses = await dns.resolve4(hostname);
      if (addresses.length > 0) {
        config.host = addresses[0];
        config.port = url.port || 5432;
        config.user = url.username;
        config.password = url.password;
        config.database = url.pathname.slice(1);
        config.ssl = { 
          rejectUnauthorized: false,
          servername: hostname // CRITICAL for SSL cert verification with IP
        };
        // Remove connectionString since we're using explicit config
        delete config.connectionString;
      }
    } catch (dnsErr) {
      console.warn('DNS lookup workaround failed, falling back to original URL:', dnsErr.message);
    }
  }

  pool = new Pool(config);
  return pool;
}

module.exports = {
  query: async (text, params) => {
    const p = await getPool();
    return p.query(text, params);
  }
};
