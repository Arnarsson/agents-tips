import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const BUTTONDOWN_API_URL = 'https://api.buttondown.email/v1';

// Create Supabase client for newsletter subscriptions
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY;

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

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

    // Primary storage: Supabase
    if (supabase) {
      // Check if already subscribed
      const { data: existing } = await supabase
        .from('newsletter_subscribers')
        .select('id, status')
        .eq('email', trimmedEmail)
        .single();

      if (existing) {
        if (existing.status === 'active') {
          return NextResponse.json({
            success: true,
            message: 'You are already subscribed!',
            alreadySubscribed: true,
          });
        }
        // Reactivate if previously unsubscribed
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({ 
            status: 'active', 
            source,
            metadata: { ...metadata, resubscribed_at: new Date().toISOString() }
          })
          .eq('id', existing.id);

        if (updateError) {
          console.error('Error reactivating subscription:', updateError);
        }
      } else {
        // Insert new subscriber
        const { error: insertError } = await supabase
          .from('newsletter_subscribers')
          .insert({
            email: trimmedEmail,
            source,
            metadata,
            status: 'active',
          });

        if (insertError) {
          // Handle unique constraint violation (race condition)
          if (insertError.code === '23505') {
            return NextResponse.json({
              success: true,
              message: 'You are already subscribed!',
              alreadySubscribed: true,
            });
          }
          console.error('Error inserting subscriber:', insertError);
          return NextResponse.json(
            { error: 'Failed to subscribe. Please try again.', success: false },
            { status: 500 }
          );
        }
      }
    }

    // Secondary: Sync to Buttondown if API key is configured
    const buttondownKey = process.env.BUTTONDOWN_API_KEY;
    if (buttondownKey) {
      try {
        const payload = {
          email: trimmedEmail,
          tags: [source, ...(metadata.referrer ? [`ref:${metadata.referrer.slice(0,50)}`] : [])],
        };

        const response = await fetch(`${BUTTONDOWN_API_URL}/subscribers`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${buttondownKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const data = await response.json();
          console.warn('Buttondown sync failed (non-critical):', data);
        }
      } catch (buttondownError) {
        // Non-critical: log but don't fail the request
        console.warn('Buttondown sync error (non-critical):', buttondownError);
      }
    }

    // If we have neither Supabase nor Buttondown, fail gracefully
    if (!supabase && !buttondownKey) {
      console.error('No newsletter storage configured (need SUPABASE or BUTTONDOWN_API_KEY)');
      return NextResponse.json(
        { error: 'Newsletter service temporarily unavailable', success: false },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to agents.tips newsletter! Welcome aboard 🚀',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', success: false },
      { status: 500 }
    );
  }
}

// Check subscription status
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');
  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  const trimmedEmail = email.trim().toLowerCase();

  // Check Supabase first
  if (supabase) {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('status')
      .eq('email', trimmedEmail)
      .single();

    if (!error && data) {
      return NextResponse.json({
        success: true,
        subscribed: data.status === 'active',
        status: data.status,
      });
    }
  }

  // Fallback to Buttondown if configured
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (apiKey) {
    const response = await fetch(`${BUTTONDOWN_API_URL}/subscribers/${encodeURIComponent(trimmedEmail)}`, {
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
  }

  return NextResponse.json({ success: true, subscribed: false });
}
