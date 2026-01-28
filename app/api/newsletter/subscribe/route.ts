import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { getWelcomeEmail } from '@/lib/email/welcome-sequence';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Create Supabase client
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY
    )
  : null;

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address', success: false },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    if (!supabase) {
      console.error('Supabase not configured for newsletter subscriptions');
      return NextResponse.json(
        { error: 'Newsletter service temporarily unavailable', success: false },
        { status: 503 }
      );
    }

    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', trimmedEmail)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking existing subscription:', checkError);
      return NextResponse.json(
        { error: 'Failed to process subscription', success: false },
        { status: 500 }
      );
    }

    // If already subscribed
    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed!',
          alreadySubscribed: true,
        });
      }

      // Resubscribe if previously unsubscribed
      if (existing.status === 'unsubscribed') {
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({
            status: 'active',
            subscribed_at: new Date().toISOString(),
            unsubscribed_at: null,
          })
          .eq('id', existing.id);

        if (updateError) {
          console.error('Error resubscribing:', updateError);
          return NextResponse.json(
            { error: 'Failed to resubscribe', success: false },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Welcome back! You have been resubscribed.',
        });
      }
    }

    // Insert new subscription
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: trimmedEmail,
        source,
        metadata,
        status: 'active',
      });

    if (insertError) {
      console.error('Error inserting subscription:', insertError);
      return NextResponse.json(
        { error: 'Failed to subscribe', success: false },
        { status: 500 }
      );
    }

    // Send welcome email (Email 1 of 3-part sequence) via Resend (if configured)
    if (resend) {
      try {
        const welcomeEmail = getWelcomeEmail(trimmedEmail);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'newsletter@agents.tips',
          to: trimmedEmail,
          subject: welcomeEmail.subject,
          html: welcomeEmail.html,
          text: welcomeEmail.text,
        });
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
        // Don't fail the whole request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', success: false },
      { status: 500 }
    );
  }
}

// GET endpoint to check subscription status (optional)
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: 'Valid email parameter required', success: false },
      { status: 400 }
    );
  }

  if (!supabase) {
    return NextResponse.json(
      { error: 'Service unavailable', success: false },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('status, subscribed_at')
    .eq('email', email.trim().toLowerCase())
    .maybeSingle();

  if (error) {
    console.error('Error checking subscription:', error);
    return NextResponse.json(
      { error: 'Failed to check subscription', success: false },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json({
      success: true,
      subscribed: false,
    });
  }

  return NextResponse.json({
    success: true,
    subscribed: data.status === 'active',
    status: data.status,
    subscribedAt: data.subscribed_at,
  });
}
