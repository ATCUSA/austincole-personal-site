/**
 * Modern Cloudflare Pages Function for contact form
 * Uses TypeScript and latest Cloudflare Workers APIs
 */

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  'cf-turnstile-response': string;
}

interface TurnstileResponse {
  success: boolean;
  'error-codes'?: string[];
}

interface EmailPayload {
  personalizations: Array<{
    to: Array<{ email: string; name?: string }>;
    dkim_domain?: string;
    dkim_selector?: string;
  }>;
  from: {
    email: string;
    name: string;
  };
  reply_to?: {
    email: string;
    name: string;
  };
  subject: string;
  content: Array<{
    type: 'text/plain' | 'text/html';
    value: string;
  }>;
}

// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// Subject mapping for better email organization
const subjectMap: Record<string, string> = {
  'cybersecurity': 'Cybersecurity Consultation',
  'emergency-mgmt': 'Emergency Management',
  'ham-radio': 'Ham Radio / ARES',
  'itdrc': 'ITDRC Volunteer Work',
  'project': 'Project Collaboration',
  'speaking': 'Speaking Engagement',
  'general': 'General Inquiry',
  'other': 'Other',
};

export async function onRequestPost(context: EventContext<Env, any, Record<string, unknown>>) {
  const { request, env } = context;

  try {
    // Parse request body
    const formData = await request.json() as ContactFormData;
    const { name, email, subject, message } = formData;
    const turnstileToken = formData['cf-turnstile-response'];

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !subject || !message?.trim() || !turnstileToken) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'All fields are required, including security verification',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Please provide a valid email address',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Verify Turnstile token
    const isValidTurnstile = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY);
    if (!isValidTurnstile) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Security verification failed. Please try again.',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Send email
    await sendContactEmail({ name, email, subject, message }, env);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.',
      }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Something went wrong. Please try again or contact me directly via social media.',
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

/**
 * Verify Cloudflare Turnstile token
 */
async function verifyTurnstile(token: string, secretKey: string): Promise<boolean> {
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const result = await response.json() as TurnstileResponse;
    return result.success;

  } catch (error) {
    console.error('Turnstile verification failed:', error);
    return false;
  }
}

/**
 * Send email using MailChannels (Cloudflare's email partner)
 */
async function sendContactEmail(
  data: { name: string; email: string; subject: string; message: string },
  env: any
): Promise<void> {
  const { name, email, subject, message } = data;
  
  const fromEmail = env.FROM_EMAIL || 'noreply@austincole.us';
  const toEmail = env.DESTINATION_EMAIL || 'austin@austincole.us';
  const emailSubject = `Website Contact: ${subjectMap[subject] || subject}`;
  
  // Create HTML email content
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        <p style="margin: 5px 0 0 0; opacity: 0.9;">From austincole.us</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
        <div style="background: white; padding: 25px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #2d3748; margin-top: 0;">Contact Details</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea;">${email}</a></p>
          <p><strong>Subject:</strong> ${subjectMap[subject] || subject}</p>
        </div>
        
        <div style="background: white; padding: 25px; border-radius: 6px;">
          <h2 style="color: #2d3748; margin-top: 0;">Message</h2>
          <div style="background: #f7fafc; padding: 20px; border-radius: 4px; border-left: 4px solid #667eea;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #e2e8f0; border-radius: 6px; font-size: 12px; color: #64748b;">
          <p style="margin: 0;"><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p style="margin: 5px 0 0 0;">This message was sent via the contact form on austincole.us</p>
        </div>
      </div>
    </div>
  `;

  // Create plain text version
  const textContent = `
New Contact Form Submission from austincole.us

Name: ${name}
Email: ${email}
Subject: ${subjectMap[subject] || subject}

Message:
${message}

---
Timestamp: ${new Date().toISOString()}
This message was sent via the contact form on austincole.us
  `.trim();

  const emailPayload: EmailPayload = {
    personalizations: [{
      to: [{ email: toEmail, name: 'Austin Cole' }],
      dkim_domain: env.DKIM_DOMAIN || 'austincole.us',
      dkim_selector: env.DKIM_SELECTOR || 'mailchannels',
    }],
    from: {
      email: fromEmail,
      name: 'Austin Cole Website',
    },
    reply_to: {
      email: email,
      name: name,
    },
    subject: emailSubject,
    content: [
      {
        type: 'text/plain',
        value: textContent,
      },
      {
        type: 'text/html',
        value: htmlContent,
      },
    ],
  };

  // Send email via MailChannels
  const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('MailChannels API error:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    });
    throw new Error('Failed to send email');
  }

  // Log success
  console.log('Email sent successfully:', {
    to: toEmail,
    subject: emailSubject,
    timestamp: new Date().toISOString(),
  });
}