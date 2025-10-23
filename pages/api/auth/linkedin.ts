import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // TODO: Replace with your actual LinkedIn OAuth configuration
    const clientId = process.env.LINKEDIN_CLIENT_ID || 'your-linkedin-client-id';
    const redirectUri = process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:3000/redirect-linkedin';
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // Store state in session or database for validation (simplified for demo)
    // In production, you should store this securely
    
    const scope = 'r_liteprofile r_emailaddress';
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=${encodeURIComponent(scope)}`;

    return res.status(200).json({
      success: true,
      url: linkedInAuthUrl,
      state: state,
    });
  } catch (error) {
    console.error('LinkedIn URL generation error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to generate LinkedIn authorization URL' 
    });
  }
}