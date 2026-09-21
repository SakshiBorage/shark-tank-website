import { resetWorkspace } from '../../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { data, updatedAt } = await resetWorkspace();
    return res.status(200).json({ data, updatedAt });
  } catch (err) {
    console.error('POST /api/workspace/reset failed', err);
    return res.status(500).json({ error: 'Could not reset workspace' });
  }
}
