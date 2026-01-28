import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { getValueEmail, getCommunityEmail } from '@/lib/email/welcome-sequence';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Create Supabase client
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY
    )
  : null;

/**
 * Newsletter Drip Campaign Endpoint
 * 
 * Sends scheduled follow-up emails to subscribers based on their subscription date.
 * 
 * Email 2 (Day 3): Value delivery - Top 5 AI Agents
 * Email 3 (Day 7): Engagement - Decision framework + community
 * 
 * Security: Requires CRON_SECRET for authentication
 * Trigger: GitHub Actions cron job (daily at 10:00 UTC)
 * 
 * Usage:
 * POST /api/newsletter/drip
 * Headers: { "Authorization": "Bearer ${CRON_SECRET}" }
 * Body: { "sequence": 2 | 3 }
 */

export async function POST(request: NextRequest) {
  try {
    // Security: Verify cron secret
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if services are configured
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 503 }
      );
    }

    if (!resend) {
      return NextResponse.json(
        { error: 'Resend not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { sequence } = body;

    if (sequence !== 2 && sequence !== 3) {
      return NextResponse.json(
        { error: 'Invalid sequence number. Must be 2 or 3.' },
        { status: 400 }
      );
    }

    // Calculate the date range for subscribers who should receive this email
    // Email 2: 3 days ago (72-96 hours)
    // Email 3: 7 days ago (168-192 hours)
    const daysAgo = sequence === 2 ? 3 : 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo - 1); // -1 for buffer
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - daysAgo);

    console.log(`Sending email sequence ${sequence} to subscribers from ${startDate.toISOString()} to ${endDate.toISOString()}`);

    // Query subscribers who subscribed within the target date range and are active
    const { data: subscribers, error: queryError } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, subscribed_at')
      .eq('status', 'active')
      .gte('subscribed_at', startDate.toISOString())
      .lte('subscribed_at', endDate.toISOString());

    if (queryError) {
      console.error('Error querying subscribers:', queryError);
      return NextResponse.json(
        { error: 'Failed to query subscribers' },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      console.log(`No subscribers found for sequence ${sequence}`);
      return NextResponse.json({
        success: true,
        message: `No subscribers to send to for sequence ${sequence}`,
        sent: 0,
      });
    }

    console.log(`Found ${subscribers.length} subscribers for sequence ${sequence}`);

    // Send emails
    const results = [];
    const errors = [];

    for (const subscriber of subscribers) {
      try {
        const emailTemplate = sequence === 2 
          ? getValueEmail(subscriber.email)
          : getCommunityEmail(subscriber.email);

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'newsletter@agents.tips',
          to: subscriber.email,
          subject: emailTemplate.subject,
          html: emailTemplate.html,
        });

        results.push(subscriber.email);
        
        // Add small delay to avoid rate limits (Resend: 10 emails/second free tier)
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (emailError) {
        console.error(`Error sending to ${subscriber.email}:`, emailError);
        errors.push({
          email: subscriber.email,
          error: emailError instanceof Error ? emailError.message : 'Unknown error',
        });
      }
    }

    console.log(`Sent ${results.length} emails, ${errors.length} failures`);

    return NextResponse.json({
      success: true,
      sequence,
      sent: results.length,
      failed: errors.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Drip campaign error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send drip emails',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint for testing/status (remove in production or add auth)
export async function GET(request: NextRequest) {
  const sequence = request.nextUrl.searchParams.get('sequence');
  
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  if (!sequence || (sequence !== '2' && sequence !== '3')) {
    return NextResponse.json(
      { error: 'Provide ?sequence=2 or ?sequence=3' },
      { status: 400 }
    );
  }

  const daysAgo = sequence === '2' ? 3 : 7;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - daysAgo - 1);
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - daysAgo);

  const { data: subscribers, error } = await supabase
    .from('newsletter_subscribers')
    .select('id, email, subscribed_at')
    .eq('status', 'active')
    .gte('subscribed_at', startDate.toISOString())
    .lte('subscribed_at', endDate.toISOString());

  if (error) {
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }

  return NextResponse.json({
    sequence: parseInt(sequence),
    daysAgo,
    dateRange: {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    },
    subscriberCount: subscribers?.length || 0,
    subscribers: subscribers?.map(s => ({
      email: s.email,
      subscribed_at: s.subscribed_at,
    })),
  });
}
