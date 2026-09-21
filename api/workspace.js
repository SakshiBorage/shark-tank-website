import { getWorkspace, patchWorkspace } from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, updatedAt } = await getWorkspace();
      return res.status(200).json({ data, updatedAt });
    } catch (err) {
      console.error('GET /api/workspace failed', err);
      return res.status(500).json({ error: 'Could not load workspace' });
    }
  }

  if (req.method === 'PATCH') {
    const patch = req.body;
    if (!patch || typeof patch !== 'object' || Array.isArray(patch)) {
      return res.status(400).json({ error: 'Body must be a JSON object of changed fields' });
    }
    try {
      const { data, updatedAt } = await patchWorkspace(patch);
      return res.status(200).json({ data, updatedAt });
    } catch (err) {
      console.error('PATCH /api/workspace failed', err);
      return res.status(500).json({ error: 'Could not save workspace' });
    }
  }

  res.setHeader('Allow', 'GET, PATCH');
  return res.status(405).json({ error: 'Method not allowed' });
}
