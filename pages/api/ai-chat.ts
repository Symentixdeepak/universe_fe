import type { NextApiRequest, NextApiResponse } from 'next';

type ReqBody = {
  conversationId: string | null;
  parentMessageId: string | null;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const body: ReqBody = req.body;
  if (!body || !body.message) {
    return res.status(400).json({ error: 'Missing message in body' });
  }

  // Using the provided Gemini API key
  const GEMINI_API_KEY = 'AIzaSyA_PGkOIMk03mPr3DOEIemHbx9d37C0TPA';

  try {
    // Call Google Gemini API - using the correct v1beta endpoint
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const payload = {
      contents: [
        {
          parts: [
            {
              text: body.message
            }
          ]
        }
      ]
    };

    const r = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error('Gemini API error:', txt);
      return res.status(502).json({ error: 'Upstream error', details: txt });
    }

    const data = await r.json();
    const assistantReply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sorry, no reply from assistant.';
    
    // Generate a conversation ID if not provided (simple implementation)
    const conversationId = body.conversationId || `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return res.status(200).json({ 
      reply: assistantReply, 
      conversationId,
      raw: data 
    });
  } catch (err: any) {
    console.error('AI API error', err);
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
