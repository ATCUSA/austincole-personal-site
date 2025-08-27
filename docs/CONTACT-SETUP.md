# Contact Form Setup Guide

This guide walks through setting up the contact form with Cloudflare Turnstile and email delivery.

## 1. Get Cloudflare Turnstile Keys

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Turnstile** in the sidebar
3. Click **Add site**
4. Configure:
   - **Site name**: Austin Cole Personal Site
   - **Domain**: austincole.us (or your chosen domain)
   - **Widget mode**: Managed (recommended)
5. Save and copy the **Site Key** and **Secret Key**

## 2. Set Up Environment Variables

In your Cloudflare Pages project, add these environment variables:

### Required Variables

```
TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here
CLOUDFLARE_ACCOUNT_ID=your_account_id
DESTINATION_EMAIL=austin@austincole.us
FROM_EMAIL=noreply@austincole.us
CLOUDFLARE_API_TOKEN=your_api_token
```

### How to Add Environment Variables

1. Go to **Cloudflare Dashboard** > **Pages**
2. Select your **austincole-personal-site** project
3. Go to **Settings** > **Environment Variables**
4. Add each variable for both **Production** and **Preview** environments

## 3. Update Site Key in Contact Form

Edit `src/contact.njk` and replace:
```html
<div class="cf-turnstile" data-sitekey="YOUR_TURNSTILE_SITE_KEY" data-theme="auto"></div>
```

With your actual site key:
```html
<div class="cf-turnstile" data-sitekey="your_actual_site_key_here" data-theme="auto"></div>
```

## 4. Email Setup Options

### Option A: Cloudflare Email Routing (Recommended)

1. Set up [Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/)
2. Add your domain and verify DNS records
3. Create routing rules to forward to your personal email
4. Get an API token with Email Routing permissions

### Option B: External Email Service (Alternative)

If Email Routing doesn't work, you can modify the `sendEmail` function in `functions/api/contact.js` to use:
- SendGrid
- Mailgun  
- Postmark
- SMTP

## 5. Test the Setup

1. Build and deploy: `pnpm build && wrangler pages deploy _site --project-name=austincole-personal-site`
2. Visit `/contact/` on your site
3. Fill out and submit the form
4. Check for:
   - Turnstile widget appears
   - Form validation works
   - Success/error messages display
   - Email delivery (check spam folder)

## 6. Security Features

The contact form includes:

- **Turnstile CAPTCHA**: Prevents spam and bot submissions
- **Server-side validation**: Validates all fields and email format
- **CORS protection**: Limits cross-origin requests
- **Rate limiting ready**: Framework for future rate limiting
- **Input sanitization**: Prevents malicious input
- **Error handling**: Graceful error responses

## 7. Troubleshooting

### Common Issues

1. **Turnstile not loading**
   - Check site key is correct
   - Verify domain matches Turnstile configuration
   - Check browser console for errors

2. **Form submission fails**
   - Verify all environment variables are set
   - Check Cloudflare Pages Functions logs
   - Ensure API tokens have correct permissions

3. **Emails not received**
   - Check spam folder
   - Verify Email Routing is configured
   - Test with a simple webhook first

### Debug Mode

For debugging, the function logs errors to the console. Check the Cloudflare Pages Functions logs:

1. Go to **Pages** > **Your Project** > **Functions**
2. Check **Real-time Logs** during testing

## 8. Production Checklist

- [ ] Turnstile site key updated in contact form
- [ ] All environment variables configured
- [ ] Email routing or alternative service working
- [ ] Form tested on actual domain
- [ ] Spam folder checked for test emails
- [ ] Error handling tested
- [ ] Mobile responsiveness verified
- [ ] Dark/light mode tested

## 9. Future Enhancements

Consider adding:
- Email templates (HTML formatting)
- Auto-reply confirmation emails  
- Form submission database logging
- Advanced rate limiting
- File attachment support
- Multiple contact forms (different purposes)

## 10. Security Notes

- Never commit API keys or secrets to the repository
- Use environment variables for all sensitive data
- Regularly rotate API tokens
- Monitor for abuse through Cloudflare Analytics
- Consider adding additional validation as needed