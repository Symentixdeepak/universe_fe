import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { code, state } = req.query;

    // Validate input
    if (!code || !state) {
      return res.status(400).json({
        success: false,
        message: 'Code and state are required'
      });
    }

    // TODO: Validate state parameter against stored value
    // In production, verify that the state matches what was stored during authorization

    // TODO: Exchange code for access token with LinkedIn
    // This is a mock implementation
    const mockUser = {
      id: 'linkedin-' + Date.now(),
      email: 'linkedin.user@example.com',
      full_name: 'LinkedIn User',
      date_of_birth: '',
      location: '',
      occupation: '',
    };

    const tokens = {
      accessToken: 'mock-linkedin-access-token-' + Date.now(),
      refreshToken: 'mock-linkedin-refresh-token-' + Date.now(),
      expiresIn: 3600, // 1 hour
      issuedAt: Date.now(),
    };

    // Mock: Determine if user is new or existing
    // In production, check your database
    const isNewUser = Math.random() > 0.5; // Random for demo

    return res.status(200).json({
      success: true,
      user: mockUser,
      tokens: tokens,
      isNewUser: isNewUser,
      message: 'LinkedIn login successful',
    });
  } catch (error) {
    console.error('LinkedIn callback error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during LinkedIn authentication'
    });
  }
}