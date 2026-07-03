import type { APIRoute } from 'astro';

// Server-rendered on demand (the rest of the site is static).
export const prerender = false;

interface Lead {
  intent: string;
  studentName: string;
  parentName: string;
  phone: string;
  email?: string;
  grade: string;
  board: string;
  program: string;
  preferredTime?: string;
  message?: string;
  company?: string; // honeypot
}

// The popup demo form asks only these four; the fuller page forms send more.
const REQUIRED: (keyof Lead)[] = ['studentName', 'phone', 'grade', 'board'];

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const clean = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export const POST: APIRoute = async ({ request }) => {
  let body: Partial<Lead>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  // Honeypot: a filled "company" field means a bot. Pretend success, do nothing.
  if (clean(body.company)) return json({ ok: true });

  // Server-side validation (never trust the client).
  const errors: Record<string, string> = {};
  for (const key of REQUIRED) {
    if (!clean(body[key])) errors[key] = 'Required.';
  }
  const phoneDigits = clean(body.phone).replace(/\D/g, '');
  if (clean(body.phone) && (phoneDigits.length < 10 || phoneDigits.length > 13)) {
    errors.phone = 'Enter a valid phone number.';
  }
  const email = clean(body.email);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email.';
  }
  if (Object.keys(errors).length) {
    return json({ error: 'Please check the highlighted fields.', errors }, 422);
  }

  const intent = clean(body.intent) === 'demo' ? 'Demo request' : 'Enquiry';
  const lead = {
    intent,
    studentName: clean(body.studentName),
    parentName: clean(body.parentName),
    phone: clean(body.phone),
    email: email || '—',
    grade: clean(body.grade),
    board: clean(body.board),
    program: clean(body.program),
    preferredTime: clean(body.preferredTime) || '—',
    message: clean(body.message) || '—',
  };

  const adminInbox = import.meta.env.ADMISSIONS_EMAIL ?? 'admissions@gravityacademy.in';
  const resendKey = import.meta.env.RESEND_API_KEY;
  const fromEmail = import.meta.env.FROM_EMAIL ?? 'Gravity Academy <noreply@gravityacademy.in>';
  const webhook = import.meta.env.LEADS_WEBHOOK;

  const rows = (Object.entries(lead) as [string, string][])
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#7086B2">${k}</td><td style="padding:4px 0;color:#0A0F1F"><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join('');
  const html = `<h2 style="font-family:sans-serif;color:#012877">${intent} — Gravity Academy</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`;

  // 1) Email the admissions inbox via Resend (if configured).
  try {
    if (resendKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [adminInbox],
          reply_to: email !== '—' ? email : undefined,
          subject: `${intent}: ${lead.studentName} · ${lead.program}`,
          html,
        }),
      });
      if (!res.ok) {
        // Don't leak provider internals or PII to the client/console.
        return json({ error: 'We could not send your request right now. Please call us instead.' }, 502);
      }
    } else if (import.meta.env.PROD) {
      // No provider configured in production — surface a clear, honest failure
      // rather than silently dropping a lead.
      return json({ error: 'Enquiries are temporarily unavailable. Please call or WhatsApp us.' }, 503);
    }
    // In dev with no key, fall through to success so the UI flow is testable.
  } catch {
    return json({ error: 'We could not send your request right now. Please call us instead.' }, 502);
  }

  // 2) Optional: forward a copy to a Sheet/CRM webhook so no lead is lost.
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
    } catch {
      // Non-fatal: the email already went out.
    }
  }

  return json({ ok: true });
};

// Any non-POST method.
export const ALL: APIRoute = () => json({ error: 'Method not allowed.' }, 405);
