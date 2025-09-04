import type { APIRoute } from 'astro';
import { z } from 'astro:content';

// Mark as server-rendered
export const prerender = false;

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be less than 2000 characters')
});

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Check if request has JSON content
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Content-Type must be application/json'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parse JSON body
    const body = await request.json();
    
    // Validate the form data
    const result = contactFormSchema.safeParse(body);
    
    if (!result.success) {
      return new Response(JSON.stringify({
        success: false,
        errors: result.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }))
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const { name, email, subject, message } = result.data;

    // Debug: Log available context for troubleshooting
    console.log('Debug - locals available:', !!locals);
    console.log('Debug - locals.runtime available:', !!locals?.runtime);
    console.log('Debug - locals.runtime.env available:', !!locals?.runtime?.env);
    
    // Access Cloudflare runtime environment
    // Based on Astro Cloudflare adapter docs, the runtime should be available via locals.runtime
    const runtime = locals?.runtime;
    const env = runtime?.env;

    console.log('Debug - runtime keys:', runtime ? Object.keys(runtime) : 'runtime not available');
    console.log('Debug - env keys:', env ? Object.keys(env) : 'env not available');

    if (!runtime) {
      throw new Error('Cloudflare runtime not available - check adapter configuration');
    }

    if (!env) {
      throw new Error('Environment variables not available in runtime context');
    }

    // Validate required environment variables
    if (!env.FROM_EMAIL) {
      throw new Error('FROM_EMAIL environment variable is not configured');
    }
    if (!env.TO_EMAIL) {
      throw new Error('TO_EMAIL environment variable is not configured');
    }
    if (!env.CONTACT_EMAIL) {
      throw new Error('CONTACT_EMAIL binding is not configured');
    }

    // Send email using Cloudflare Email Workers
    // Based on Email Workers API documentation
    const emailMessage = {
      from: env.FROM_EMAIL,
      to: env.TO_EMAIL,
      subject: `Contact Form: ${subject}`,
      text: `
Contact Form Submission

From: ${name} (${email})
Subject: ${subject}

Message:
${message}

---
Sent from austincole.us contact form
Timestamp: ${new Date().toISOString()}
      `.trim(),
      html: `
<h2>Contact Form Submission</h2>
<p><strong>From:</strong> ${name} (${email})</p>
<p><strong>Subject:</strong> ${subject}</p>

<h3>Message:</h3>
<p>${message.replace(/\n/g, '<br>')}</p>

<hr>
<p><small>Sent from austincole.us contact form<br>
Timestamp: ${new Date().toISOString()}</small></p>
      `.trim()
    };

    // Send via Email Workers binding
    await env.CONTACT_EMAIL.send(emailMessage);

    console.log('Contact form email sent successfully:', {
      from: env.FROM_EMAIL,
      to: env.TO_EMAIL,
      subject,
      timestamp: new Date().toISOString()
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      message: 'An unexpected error occurred. Please try again later.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

// Handle preflight OPTIONS requests for CORS
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
};