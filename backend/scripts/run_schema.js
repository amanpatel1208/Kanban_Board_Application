require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const dbUrl = process.env.DATABASE_URL || '';
const needsSsl = dbUrl.includes('supabase') || dbUrl.includes('neon');

const pool = new Pool({
  connectionString: dbUrl,
  ssl: needsSsl ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 15000,
});

const run = async () => {
  const schemaPath = path.join(__dirname, '..', 'src', 'db', 'schema.sql');
  const extrasPath = path.join(__dirname, '..', 'src', 'db', 'seed_extras.sql');
  const massivePath = path.join(__dirname, '..', 'src', 'db', 'massive_seed.sql');

  try {
    console.log('Running schema against:', dbUrl.replace(/\/\/.*@/, '//***@'));
    await pool.query(fs.readFileSync(schemaPath, 'utf8'));
    console.log('✅ Schema applied successfully!');

    if (fs.existsSync(extrasPath)) {
      await pool.query(fs.readFileSync(extrasPath, 'utf8'));
      console.log('✅ Seed extras applied successfully!');
    }
    if (fs.existsSync(massivePath)) {
      await pool.query(fs.readFileSync(massivePath, 'utf8'));
      console.log('✅ Massive seed applied successfully!');
    }
  } catch (err) {
    console.error('❌ Schema/Seed failed:', err.message);
  } finally {
    await pool.end();
  }
};

run();
