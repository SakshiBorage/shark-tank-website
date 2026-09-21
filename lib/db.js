import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const seed = JSON.parse(readFileSync(join(__dirname, 'seed.json'), 'utf8'));

const sql = neon(process.env.DATABASE_URL);

export async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS workspace (
      id SMALLINT PRIMARY KEY DEFAULT 1,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    INSERT INTO workspace (id, data)
    SELECT 1, ${JSON.stringify(seed)}::jsonb
    WHERE NOT EXISTS (SELECT 1 FROM workspace WHERE id = 1)
  `;
}

export async function getWorkspace() {
  await ensureSchema();
  const rows = await sql`SELECT data, updated_at FROM workspace WHERE id = 1`;
  return { data: rows[0].data, updatedAt: rows[0].updated_at };
}

export async function patchWorkspace(patch) {
  await ensureSchema();
  const rows = await sql`
    UPDATE workspace SET data = data || ${JSON.stringify(patch)}::jsonb, updated_at = now()
    WHERE id = 1 RETURNING data, updated_at
  `;
  return { data: rows[0].data, updatedAt: rows[0].updated_at };
}

export async function resetWorkspace() {
  await ensureSchema();
  const rows = await sql`
    UPDATE workspace SET data = ${JSON.stringify(seed)}::jsonb, updated_at = now()
    WHERE id = 1 RETURNING data, updated_at
  `;
  return { data: rows[0].data, updatedAt: rows[0].updated_at };
}
