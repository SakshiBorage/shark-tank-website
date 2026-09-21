import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ensureSchema, getWorkspace, patchWorkspace, resetWorkspace } from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json({ limit: '2mb' }));

app.get('/api/workspace', async (req, res) => {
  try {
    const { data, updatedAt } = await getWorkspace();
    res.json({ data, updatedAt });
  } catch (err) {
    console.error('GET /api/workspace failed', err);
    res.status(500).json({ error: 'Could not load workspace' });
  }
});

app.patch('/api/workspace', async (req, res) => {
  const patch = req.body;
  if (!patch || typeof patch !== 'object' || Array.isArray(patch)) {
    return res.status(400).json({ error: 'Body must be a JSON object of changed fields' });
  }
  try {
    const { data, updatedAt } = await patchWorkspace(patch);
    res.json({ data, updatedAt });
  } catch (err) {
    console.error('PATCH /api/workspace failed', err);
    res.status(500).json({ error: 'Could not save workspace' });
  }
});

app.post('/api/workspace/reset', async (req, res) => {
  try {
    const { data, updatedAt } = await resetWorkspace();
    res.json({ data, updatedAt });
  } catch (err) {
    console.error('POST /api/workspace/reset failed', err);
    res.status(500).json({ error: 'Could not reset workspace' });
  }
});

app.use(express.static(join(__dirname, '..', 'public')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

ensureSchema()
  .then(() => {
    app.listen(PORT, () => console.log(`Shark Tank HQ listening on :${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to initialize database schema', err);
    process.exit(1);
  });
