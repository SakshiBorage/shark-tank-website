import pg from 'pg';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const seed = JSON.parse(readFileSync(join(__dirname, 'seed.json'), 'utf8'));

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('render.com') ? { rejectUnauthorized: false } : false
});

export async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS workspace (
      id SMALLINT PRIMARY KEY DEFAULT 1,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  const { rows } = await pool.query('SELECT id FROM workspace WHERE id = 1');
  if (rows.length === 0) {
    await pool.query('INSERT INTO workspace (id, data) VALUES (1, $1::jsonb)', [JSON.stringify(seed)]);
  }
}

export async function getWorkspace() {
  const { rows } = await pool.query('SELECT data, updated_at FROM workspace WHERE id = 1');
  return { data: rows[0].data, updatedAt: rows[0].updated_at };
}

export async function patchWorkspace(patch) {
  const { rows } = await pool.query(
    `UPDATE workspace SET data = data || $1::jsonb, updated_at = now()
     WHERE id = 1 RETURNING data, updated_at`,
    [JSON.stringify(patch)]
  );
  return { data: rows[0].data, updatedAt: rows[0].updated_at };
}

export async function resetWorkspace() {
  const { rows } = await pool.query(
    `UPDATE workspace SET data = $1::jsonb, updated_at = now()
     WHERE id = 1 RETURNING data, updated_at`,
    [JSON.stringify(seed)]
  );
  return { data: rows[0].data, updatedAt: rows[0].updated_at };
}
