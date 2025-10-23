import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const userData = req.body;
    const { email, password, fullName, dateOfBirth, location, occupation } = userData;

    // Validate required fields
    if (!email || !password || !fullName) {
      return res.status(400).json({ 
        message: 'Email, password, and full name are required' 
      });
    }

    // TODO: Replace with your actual registration logic
    // This is a mock implementation
    
    // Mock: Check if user already exists
    if (email === 'existing@example.com') {
      return res.status(409).json({ 
        message: 'User already exists with this email' 
      });
    }

    // Mock: Create user
    const user = {
      id: 'user-' + Date.now(),
      email: email,
      name: fullName,
      dateOfBirth: dateOfBirth,
      location: location,
      occupation: occupation,
    };

    const token = 'mock-jwt-token-' + Date.now();

    return res.status(200).json({
      success: true,
      token: token,
      user: user,
      message: 'Registration successful',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}