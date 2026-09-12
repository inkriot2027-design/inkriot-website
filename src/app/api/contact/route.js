// Contact form submission endpoint.
// Validates input, then forwards to a webhook if CONTACT_WEBHOOK_URL is
// set, otherwise logs (dev mode) and returns success. Never exposes
// secrets to the client.

export const runtime = 'nodejs';

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, message } = data || {};
  const emailOk = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk || !message) {
    return Response.json(
      { ok: false, error: 'Please provide a name, a valid email, and project details.' },
      { status: 422 }
    );
  }

  const payload = {
    ...data,
    receivedAt: new Date().toISOString(),
    source: 'inkriot-website',
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  try {
    if (webhook) {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      // Dev mode: no destination configured.
      console.log('[contact] submission (dev mode):', payload);
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error('[contact] forward failed:', err);
    return Response.json({ ok: false, error: 'Could not send right now. Please try again.' }, { status: 502 });
  }
}
