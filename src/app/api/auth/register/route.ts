import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    const { email, password, fullName, dateOfBirth, location, occupation } = userData;

    // Validate required fields
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { message: 'Email, password, and full name are required' },
        { status: 400 }
      );
    }

    // TODO: Replace with your actual registration logic
    // This is a mock implementation
    
    // Mock: Check if user already exists
    if (email === 'existing@example.com') {
      return NextResponse.json(
        { message: 'User already exists with this email' },
        { status: 409 }
      );
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

    return NextResponse.json({
      success: true,
      token: token,
      user: user,
      message: 'Registration successful',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}