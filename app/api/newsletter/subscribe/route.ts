import { NextRequest, NextResponse } from 'next/server';

const BUTTONDOWN_API_URL = 'https://api.buttondown.email/v1';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source = 'footer', metadata = {} } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required', success: false },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Basic email validation
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address', success: false },
        { status: 400 }
      );
    }

    const apiKey = process.env.BUTTONDOWN_API_KEY;
    if (!apiKey) {
      console.error('Buttondown API key not configured');
      return NextResponse.json(
        { error: 'Newsletter service temporarily unavailable', success: false },
        { status: 503 }
      );
    }

    // Check if subscriber exists
    let checkResponse = await fetch(`${BUTTONDOWN_API_URL}/subscribers/${encodeURIComponent(trimmedEmail)}`, {
      headers: {
        'Authorization': `Token ${apiKey}`,
      },
    });

    let existing;
    if (checkResponse.ok) {
      existing = await checkResponse.json();
      if (existing.status === 'active') {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed!',
          alreadySubscribed: true,
        });
      }
    }

    // Create new subscriber (or resubscribe if unsubscribed)
    const payload = {
      email: trimmedEmail,
      tags: [source, ...(metadata.referrer ? [`ref:${metadata.referrer.slice(0,50)}`] : [])],
    };

    const response = await fetch(`${BUTTONDOWN_API_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to agents.tips newsletter! Welcome aboard 🚀',
      });
    } else {
      console.error('Buttondown error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to subscribe. Please try again.', success: false },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', success: false },
      { status: 500 }
    );
  }
}

// Optional: Check subscription status
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');
  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  const response = await fetch(`${BUTTONDOWN_API_URL}/subscribers/${encodeURIComponent(email.trim().toLowerCase())}`, {
    headers: { 'Authorization': `Token ${apiKey}` },
  });

  if (response.ok) {
    const data = await response.json();
    return NextResponse.json({
      success: true,
      subscribed: data.status === 'active',
      status: data.status,
    });
  }

  return NextResponse.json({ success: true, subscribed: false });
}
