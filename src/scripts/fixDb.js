/* eslint-disable @typescript-eslint/no-require-imports */
const url = process.env.DATABASE_URI || 'postgresql://postgres.xgaemrvenyqnmzwylgsk:P0rtug%40l%23%5E%25%40lld%40y@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true';
const { Client } = require('pg');

const client = new Client({
  connectionString: url,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to DB.");

    await client.query('ALTER TABLE "pages_blocks_process_phases" DROP COLUMN IF EXISTS "numeral";');
    console.log("Dropped numeral column.");

  } catch (err) {
    console.error("DB error:", err);
  } finally {
    await client.end();
  }
}

run();
