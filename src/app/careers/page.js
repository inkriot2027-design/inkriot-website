'use client';

import { useState } from 'react';
import Stepper, { Step } from '@/components/reactbits/Stepper';
import { Reveal, SectionHeader } from '@/components/ui/primitives';
import { GradientText } from '@/components/reactbits/TextEffects';
import { ROLES } from '@/data/careers';
import styles from './careers.module.css';

export default function CareersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ role: ROLES[0], name: '', email: '', portfolio: '', about: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <header className={styles.hero}>
        <div className="container">
          <p className="eyebrow">Careers</p>
          <h1 className={styles.heroTitle}>Create with <GradientText>INKRIOT.</GradientText></h1>
          <p className="lead" style={{ marginTop: '1.5rem' }}>
            We’re always looking for creative people who like making things across mediums. If that’s
            you, let’s talk.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <SectionHeader eyebrow="Open roles" title="Who we're looking for." />
          <div className={styles.roles}>
            {ROLES.map((r, i) => (
              <Reveal key={r} delay={(i % 4) * 30}>
                <span className={styles.role}>{r}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.applySection}`}>
        <div className="container">
          <SectionHeader eyebrow="Apply" title="Three quick steps." />
          {submitted ? (
            <div className={styles.done}>
              <h3>Thanks, {form.name || 'creative'} 👋</h3>
              <p>Your application for <strong>{form.role}</strong> is in. We’ll be in touch.</p>
            </div>
          ) : (
            <div className={styles.stepperWrap}>
              <Stepper
                initialStep={1}
                onFinalStepCompleted={() => setSubmitted(true)}
                backButtonText="Back"
                nextButtonText="Continue"
              >
                <Step>
                  <h3 className={styles.stepTitle}>Your role</h3>
                  <p className="muted" style={{ marginBottom: '1rem' }}>Which role are you applying for?</p>
                  <select className={styles.input} value={form.role} onChange={set('role')}>
                    {ROLES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </Step>
                <Step>
                  <h3 className={styles.stepTitle}>About you</h3>
                  <label className={styles.fieldLabel}>Name
                    <input className={styles.input} value={form.name} onChange={set('name')} placeholder="Your name" />
                  </label>
                  <label className={styles.fieldLabel}>Email
                    <input className={styles.input} type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" />
                  </label>
                </Step>
                <Step>
                  <h3 className={styles.stepTitle}>Your work</h3>
                  <label className={styles.fieldLabel}>Portfolio link
                    <input className={styles.input} value={form.portfolio} onChange={set('portfolio')} placeholder="https://" />
                  </label>
                  <label className={styles.fieldLabel}>Tell us about yourself
                    <textarea className={styles.input} rows={4} value={form.about} onChange={set('about')} placeholder="What do you make, and why INKRIOT?" />
                  </label>
                </Step>
              </Stepper>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
