import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const GEMINI_API_KEY = 'AIzaSyA_PGkOIMk03mPr3DOEIemHbx9d37C0TPA';

  try {
    // List available models
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`;
    
    const r = await fetch(listUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error('List models error:', txt);
      return res.status(502).json({ error: 'Failed to list models', details: txt });
    }

    const data = await r.json();
    
    // Extract model names that support generateContent
    const availableModels = data.models
      ?.filter((model: any) => model.supportedGenerationMethods?.includes('generateContent'))
      .map((model: any) => model.name);
    
    return res.status(200).json({ 
      availableModels,
      fullData: data 
    });
  } catch (err: any) {
    console.error('Test API error', err);
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
