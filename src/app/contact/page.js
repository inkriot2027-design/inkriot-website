'use client';

import { useState } from 'react';
import GradientWaves from '@/components/reactbits/GradientWaves';
import SpecularButton from '@/components/reactbits/SpecularButton';
import { GradientText } from '@/components/reactbits/TextEffects';
import { SERVICES } from '@/data/services';
import { SOCIAL_LINKS } from '@/data/nav';
import styles from './contact.module.css';

const BUDGETS = ['Under ₹25k', '₹25k–₹1L', '₹1L–₹5L', '₹5L+', 'Not sure yet'];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: SERVICES[0].title, budget: BUDGETS[2], message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('ok');
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  return (
    <>
      <header className={styles.hero}>
        <GradientWaves colors={['#f5f4f0', '#e5262b', '#2b4cff']} opacity={0.4} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <p className="eyebrow">Contact</p>
          <h1 className={styles.heroTitle}>Have an idea?<br /><GradientText>Make it real.</GradientText></h1>
          <p className="lead" style={{ marginTop: '1.5rem' }}>
            Tell us what you’re working on. Whether it’s a brand, a website, a campaign, a film or
            something we haven’t thought of yet — we’re listening.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            {/* Form */}
            <div className={styles.formWrap}>
              {status === 'ok' ? (
                <div className={styles.success}>
                  <h2>Message sent 🎉</h2>
                  <p>Thanks, {form.name || 'there'}. We’ll be in touch at <strong>{form.email}</strong> soon.</p>
                  <button className={styles.reset} onClick={() => { setStatus('idle'); setForm({ name: '', email: '', company: '', service: SERVICES[0].title, budget: BUDGETS[2], message: '' }); }}>
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className={styles.form} noValidate>
                  <div className={styles.row}>
                    <label className={styles.field}>
                      <span>Name *</span>
                      <input value={form.name} onChange={set('name')} required placeholder="Your name" />
                    </label>
                    <label className={styles.field}>
                      <span>Email *</span>
                      <input type="email" value={form.email} onChange={set('email')} required placeholder="you@email.com" />
                    </label>
                  </div>
                  <label className={styles.field}>
                    <span>Company / Brand</span>
                    <input value={form.company} onChange={set('company')} placeholder="Optional" />
                  </label>
                  <div className={styles.row}>
                    <label className={styles.field}>
                      <span>Service</span>
                      <select value={form.service} onChange={set('service')}>
                        {SERVICES.map((s) => <option key={s.slug}>{s.title}</option>)}
                      </select>
                    </label>
                    <label className={styles.field}>
                      <span>Budget</span>
                      <select value={form.budget} onChange={set('budget')}>
                        {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                      </select>
                    </label>
                  </div>
                  <label className={styles.field}>
                    <span>Project details *</span>
                    <textarea rows={5} value={form.message} onChange={set('message')} required placeholder="Tell us about the idea, goals and timeline." />
                  </label>

                  {status === 'error' && <p className={styles.error}>{error}</p>}

                  <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send message →'}
                  </button>
                </form>
              )}
            </div>

            {/* Aside */}
            <aside className={styles.aside}>
              <div>
                <p className={styles.asideTitle}>Prefer email?</p>
                <a href="mailto:hello@inkriot.com" className={styles.email}>hello@inkriot.com</a>
              </div>
              <div>
                <p className={styles.asideTitle}>Studio</p>
                <p className="muted">Kanyakumari, Tamil Nadu, India</p>
              </div>
              <div>
                <p className={styles.asideTitle}>Follow</p>
                <div className={styles.social}>
                  {SOCIAL_LINKS.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}
                </div>
              </div>
              <div className={styles.tag}>
                <p>We create. <span className="c-yellow">You get noticed.</span></p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
