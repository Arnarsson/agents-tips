'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Loader2, Check, AlertCircle } from 'lucide-react';

interface NewsletterSignupProps {
  source?: string;
  variant?: 'default' | 'compact' | 'inline';
  placeholder?: string;
  className?: string;
}

export function NewsletterSignup({
  source = 'footer',
  variant = 'default',
  placeholder = 'Enter your email',
  className = '',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          source,
          metadata: {
            referrer: typeof window !== 'undefined' ? document.referrer : null,
            pathname: typeof window !== 'undefined' ? window.location.pathname : null,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed!');
        setEmail('');

        // Reset status after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
    }
  };

  const renderDefault = () => (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        <Mail className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold">Subscribe to our newsletter</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Get weekly updates on new AI agents, tools, and industry insights.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading' || status === 'success'}
          className="flex-1"
          required
        />
        <Button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="shrink-0"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : status === 'success' ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Subscribed!
            </>
          ) : (
            'Subscribe'
          )}
        </Button>
      </form>
      {message && (
        <div
          className={`flex items-center gap-2 text-sm ${
            status === 'success'
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {status === 'success' ? (
            <Check className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          {message}
        </div>
      )}
    </div>
  );

  const renderCompact = () => (
    <div className={`space-y-2 ${className}`}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading' || status === 'success'}
          className="flex-1 h-9 text-sm"
          required
        />
        <Button
          type="submit"
          size="sm"
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : status === 'success' ? (
            <Check className="h-3 w-3" />
          ) : (
            'Subscribe'
          )}
        </Button>
      </form>
      {message && (
        <p className={`text-xs ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );

  const renderInline = () => (
    <form onSubmit={handleSubmit} className={`flex items-center gap-2 ${className}`}>
      <Input
        type="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'loading' || status === 'success'}
        className="flex-1 h-10"
        required
      />
      <Button
        type="submit"
        variant="outline"
        size="sm"
        disabled={status === 'loading' || status === 'success'}
      >
        {status === 'loading' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : status === 'success' ? (
          <Check className="h-4 w-4" />
        ) : (
          <Mail className="h-4 w-4" />
        )}
      </Button>
      {message && (
        <span className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </span>
      )}
    </form>
  );

  switch (variant) {
    case 'compact':
      return renderCompact();
    case 'inline':
      return renderInline();
    default:
      return renderDefault();
  }
}

// Standalone newsletter CTA section for use on landing pages
export function NewsletterCTA() {
  return (
    <section className="border rounded-lg p-8 bg-muted/50">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-3xl font-bold">Stay in the loop</h2>
        <p className="text-lg text-muted-foreground">
          Join 1,000+ developers and founders getting weekly AI agent insights delivered to their inbox.
        </p>
        <div className="max-w-md mx-auto">
          <NewsletterSignup source="landing-cta" variant="default" />
        </div>
      </div>
    </section>
  );
}
