import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // TODO: Replace with your actual authentication logic
    // This is a mock implementation
    if (email === 'demo@example.com' && password === 'password') {
      const user = {
        id: '1',
        email: email,
        name: 'Demo User',
      };

      const token = 'mock-jwt-token-' + Date.now();

      return NextResponse.json({
        success: true,
        token: token,
        user: user,
      });
    } else {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}