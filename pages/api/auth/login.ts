import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // TODO: Replace with your actual authentication logic
    // This is a mock implementation
    if (email === 'demo@example.com' && password === 'password') {
      const user = {
        id: '1',
        email: email,
        full_name: 'Demo User',
        date_of_birth: '',
        location: '',
        occupation: '',
        profileCompleted: false, // Set to false to test interests redirect
      };

      const tokens = {
        accessToken: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        expiresIn: 3600, // 1 hour
      };

      return res.status(200).json({
        success: true,
        data: {
          tokens: tokens,
          user: user,
        },
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}