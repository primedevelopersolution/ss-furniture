import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

// Simple in-memory rate limiting map for route handler
// Maps IP to array of submission timestamps
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);

  // Periodic cleanup if map grows
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every((t) => now - t >= windowMs)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return false;
}

// Sanitize string to prevent email header injection and trim
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[\r\n]/g, ' ').trim();
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown-ip';

    // Rate limiting check
    if (isRateLimited(ip)) {
      return Response.json(
        {
          success: false,
          error: 'Too many enquiry submissions from this connection. Please wait a few minutes or call us directly.',
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));

    // Honeypot anti-spam check: field 'company_website' must remain empty
    if (body.company_website) {
      // Silently return bad request to spam bots
      return Response.json(
        { success: false, error: 'Spam submission detected.' },
        { status: 400 }
      );
    }

    const rawName = sanitizeInput(body.name);
    const rawEmail = sanitizeInput(body.email);
    const rawPhone = sanitizeInput(body.phone);
    const rawCategory = sanitizeInput(body.category || 'General Home Furniture');
    const rawMessage = typeof body.message === 'string' ? body.message.trim() : '';

    // Server-side validation
    const errors = [];
    if (!rawName || rawName.length < 2 || rawName.length > 80) {
      errors.push('Full name must be between 2 and 80 characters.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rawEmail || !emailRegex.test(rawEmail) || rawEmail.length > 120) {
      errors.push('A valid email address is required.');
    }

    // Phone validation (accepts Indian & international mobile/landline formats)
    const phoneClean = rawPhone.replace(/[\s\-\(\)\+]/g, '');
    if (!rawPhone || phoneClean.length < 8 || phoneClean.length > 15 || !/^\d+$/.test(phoneClean)) {
      errors.push('A valid phone number (at least 8-10 digits) is required.');
    }

    if (!rawMessage || rawMessage.length < 10 || rawMessage.length > 2500) {
      errors.push('Message must be between 10 and 2500 characters.');
    }

    if (errors.length > 0) {
      return Response.json(
        { success: false, error: errors.join(' ') },
        { status: 400 }
      );
    }

    // Check SMTP configuration
    const {
      OWNER_EMAIL,
      DEVELOPER_EMAIL,
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM_EMAIL,
      SMTP_FROM_NAME,
    } = process.env;

    const isSmtpConfigured =
      Boolean(SMTP_HOST) &&
      Boolean(SMTP_USER) &&
      Boolean(SMTP_PASS) &&
      Boolean(OWNER_EMAIL);

    if (!isSmtpConfigured) {
      // Diagnostic safe log
      console.warn(
        '[S.S. Furniture Contact API] Enquiry received, but SMTP credentials are not yet configured in environment variables.',
        {
          hasSmtpHost: Boolean(SMTP_HOST),
          hasSmtpUser: Boolean(SMTP_USER),
          hasSmtpPass: Boolean(SMTP_PASS),
          hasOwnerEmail: Boolean(OWNER_EMAIL),
          hasDevEmail: Boolean(DEVELOPER_EMAIL),
        }
      );

      return Response.json(
        {
          success: false,
          error:
            'The contact mail service is currently awaiting SMTP configuration on the server. Please contact S.S. Furniture directly at +91 9823599547 or via WhatsApp.',
          diagnostic: 'SMTP_CREDENTIALS_MISSING',
        },
        { status: 503 }
      );
    }

    // Create Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT || '587', 10),
      secure: SMTP_SECURE === 'true',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const timestampStr = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const fromAddress = `"${SMTP_FROM_NAME || 'S.S. Furniture'}" <${
      SMTP_FROM_EMAIL || SMTP_USER
    }>`;

    const cleanName = escapeHtml(rawName);
    const cleanEmail = escapeHtml(rawEmail);
    const cleanPhone = escapeHtml(rawPhone);
    const cleanCategory = escapeHtml(rawCategory);
    const cleanMessage = escapeHtml(rawMessage).replace(/\n/g, '<br/>');

    // 1. Email to Shop Owner
    const ownerMailOptions = {
      from: fromAddress,
      to: OWNER_EMAIL,
      replyTo: rawEmail,
      subject: `New Furniture Enquiry — ${rawName} [${rawCategory}]`,
      text: `NEW FURNITURE ENQUIRY — S.S. FURNITURE
----------------------------------------
Customer Name: ${rawName}
Email: ${rawEmail}
Phone Number: ${rawPhone}
Category/Product of Interest: ${rawCategory}
Submission Time: ${timestampStr} IST

Customer Message:
${rawMessage}
----------------------------------------
Reply directly to this email to contact the customer.`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e0d8ce; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #25160E; padding: 20px 24px; border-bottom: 3px solid #C5A059;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px;">S.S. Furniture — New Website Enquiry</h2>
          </div>
          <div style="padding: 24px; color: #2D2825; font-size: 15px; line-height: 1.6;">
            <p style="margin-top: 0;">You have received a new furniture enquiry from your website:</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #f0eae1;">
                <td style="padding: 8px 0; color: #8C8276; width: 140px;">Customer Name:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #25160E;">${cleanName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0eae1;">
                <td style="padding: 8px 0; color: #8C8276;">Customer Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${cleanEmail}" style="color: #C5A059;">${cleanEmail}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f0eae1;">
                <td style="padding: 8px 0; color: #8C8276;">Phone Number:</td>
                <td style="padding: 8px 0;"><a href="tel:${cleanPhone}" style="color: #25160E; font-weight: 600;">${cleanPhone}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f0eae1;">
                <td style="padding: 8px 0; color: #8C8276;">Category / Item:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #C5A059;">${cleanCategory}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #8C8276;">Date &amp; Time:</td>
                <td style="padding: 8px 0; color: #5C554F;">${timestampStr} IST</td>
              </tr>
            </table>

            <div style="background-color: #FAF8F5; border-left: 4px solid #C5A059; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
              <div style="font-weight: 600; color: #25160E; margin-bottom: 6px;">Customer Message:</div>
              <div style="color: #4A4540;">${cleanMessage}</div>
            </div>

            <p style="font-size: 13px; color: #8C8276; margin-bottom: 0;">
              Tip: You can click "Reply" to write directly back to ${cleanName} at ${cleanEmail}.
            </p>
          </div>
        </div>
      `,
    };

    // 2. Email to Developer (if DEVELOPER_EMAIL configured)
    const developerMailOptions = DEVELOPER_EMAIL
      ? {
          from: fromAddress,
          to: DEVELOPER_EMAIL,
          subject: `New S.S. Furniture Website Enquiry — ${rawName}`,
          text: `S.S. FURNITURE WEBSITE SYSTEM NOTIFICATION
----------------------------------------
New enquiry received via production website.
Customer: ${rawName}
Email: ${rawEmail}
Phone: ${rawPhone}
Category: ${rawCategory}
Timestamp: ${timestampStr} IST
Client IP: ${ip}
Message: ${rawMessage}
----------------------------------------`,
          html: `
            <div style="font-family: monospace; padding: 18px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; color: #1e293b;">
              <h3 style="color: #0f172a; margin-top: 0;">S.S. Furniture Website — Form Notification</h3>
              <p><strong>Customer:</strong> ${cleanName} (${cleanEmail}, ${cleanPhone})</p>
              <p><strong>Category:</strong> ${cleanCategory}</p>
              <p><strong>Timestamp:</strong> ${timestampStr} IST</p>
              <p><strong>Client IP:</strong> ${ip}</p>
              <p><strong>Message:</strong></p>
              <pre style="background: #ffffff; padding: 12px; border: 1px solid #e2e8f0; border-radius: 4px;">${cleanMessage}</pre>
            </div>
          `,
        }
      : null;

    // 3. Email to Customer (Confirmation)
    const customerMailOptions = {
      from: fromAddress,
      to: rawEmail,
      subject: `We Received Your Furniture Enquiry — S.S. Furniture`,
      text: `Dear ${rawName},

Thank you for contacting S.S. Furniture. We have received your enquiry regarding ${rawCategory}.

Summary of your message:
"${rawMessage}"

Our showroom team will review your enquiry details. If you need immediate assistance or would like to plan a visit to our showroom, please feel free to call us at +91 9823599547, email us at contact@ssfurniture.in, or chat with us on WhatsApp.

Warm regards,
S.S. Furniture Showroom
Shop no. 5, Aai Chandika Hills, Waki Pada, near Sargam Residency Bapane, Naigaon East, Maharashtra 401208
Phone: +91 9823599547
Email: contact@ssfurniture.in`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e0d8ce; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #25160E; padding: 24px; text-align: center; border-bottom: 3px solid #C5A059;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-family: Georgia, serif; letter-spacing: 1px;">S.S. FURNITURE</h1>
            <p style="color: #C5A059; margin: 4px 0 0; font-size: 11px; letter-spacing: 2px;">HOME FURNITURE SHOWROOM</p>
          </div>
          <div style="padding: 28px 24px; color: #2D2825; font-size: 15px; line-height: 1.65;">
            <p style="margin-top: 0; font-size: 16px;">Dear <strong>${cleanName}</strong>,</p>
            <p>
              Thank you for reaching out to <strong>S.S. Furniture</strong>. We have successfully received your enquiry regarding <strong>${cleanCategory}</strong>.
            </p>

            <div style="background-color: #FAF8F5; border-left: 3px solid #C5A059; padding: 14px 18px; border-radius: 4px; margin: 20px 0;">
              <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #8C8276; margin-bottom: 4px;">Your Enquiry Summary</div>
              <div style="color: #38322E; font-style: italic;">"${cleanMessage}"</div>
            </div>

            <p>
              Our team will review your specifications. If you would like immediate assistance or have urgent dimension queries, please feel free to connect with us directly:
            </p>

            <div style="margin: 22px 0; padding: 14px 18px; background-color: #F4EEDB; border-radius: 6px; display: inline-block; width: 100%; box-sizing: border-box;">
              <div style="font-size: 13px; color: #695738;">Direct Showroom Contact</div>
              <div style="font-size: 18px; font-weight: 700; color: #25160E; margin-top: 2px;">
                📞 +91 98235 99547
              </div>
              <div style="font-size: 14px; color: #5C554F; margin-top: 4px;">
                ✉️ contact@ssfurniture.in
              </div>
            </div>

            <p style="margin-bottom: 0; font-size: 14px; color: #5C554F; line-height: 1.5;">
              Warm regards,<br/>
              <strong>The Team at S.S. Furniture</strong><br/>
              Shop no. 5, Aai Chandika Hills, Waki Pada, near Sargam Residency Bapane, Naigaon East, Maharashtra 401208
            </p>
          </div>
        </div>
      `,
    };

    // Execute sending with error tracking
    const emailPromises = [
      transporter.sendMail(ownerMailOptions),
      customerMailOptions ? transporter.sendMail(customerMailOptions) : Promise.resolve(),
    ];

    if (developerMailOptions) {
      emailPromises.push(transporter.sendMail(developerMailOptions));
    }

    const settled = await Promise.allSettled(emailPromises);

    const ownerResult = settled[0];
    const customerResult = settled[1];
    const devResult = settled[2];

    const hasOwnerFailed = ownerResult.status === 'rejected';
    const hasCustomerFailed = customerResult.status === 'rejected';
    const hasDevFailed = devResult && devResult.status === 'rejected';

    if (hasOwnerFailed) {
      console.error('[S.S. Furniture Contact API] Owner notification email failed:', {
        reason: ownerResult.reason?.message || 'Unknown SMTP error',
      });
      return Response.json(
        {
          success: false,
          error:
            'Unable to deliver notification to showroom mailbox. Please contact us directly at +91 9823599547.',
        },
        { status: 502 }
      );
    }

    // Capture preview URLs if ethereal/test SMTP is used
    const ownerPreviewUrl = ownerResult.status === 'fulfilled' ? nodemailer.getTestMessageUrl(ownerResult.value) : null;
    const customerPreviewUrl = customerResult.status === 'fulfilled' ? nodemailer.getTestMessageUrl(customerResult.value) : null;

    if (ownerPreviewUrl) {
      console.log('[S.S. Furniture Contact API] Test Email Sent! Owner Email Preview URL:', ownerPreviewUrl);
      console.log('[S.S. Furniture Contact API] Test Email Sent! Customer Confirmation Preview URL:', customerPreviewUrl);
    }

    if (hasCustomerFailed) {
      console.warn('[S.S. Furniture Contact API] Customer confirmation email failed:', {
        reason: customerResult.reason?.message,
      });
    }

    if (hasDevFailed) {
      console.warn('[S.S. Furniture Contact API] Developer notification email failed:', {
        reason: devResult?.reason?.message,
      });
    }

    // Success response
    return Response.json({
      success: true,
      message:
        'Thank you! Your enquiry has been received by S.S. Furniture. A confirmation email has been sent to your inbox.',
      previews: ownerPreviewUrl ? { owner: ownerPreviewUrl, customer: customerPreviewUrl } : undefined,
    });
  } catch (error) {
    console.error('[S.S. Furniture Contact API] Unexpected error handling contact enquiry:', {
      name: error?.name,
      message: error?.message,
    });

    return Response.json(
      {
        success: false,
        error:
          'An unexpected server error occurred while processing your enquiry. Please call us at +91 9823599547.',
      },
      { status: 500 }
    );
  }
}
