'use client';

import { useRef, useState } from 'react';
import { programs } from '@/data/programs';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';
import Button from './Button';
import Icon from './Icon';

/**
 * Shared lead-capture form used by both the Enquiry and Book-a-Demo flows.
 * `intent` keeps the label consistent through the flow (§8): the button that says
 * "Book a free demo" leads to a state that confirms "Demo requested".
 *
 * Submits client-side to Web3Forms — UNCHANGED from the Astro build (same access
 * key, same hidden fields, same `json.success` check). No server route.
 */
interface Props {
  intent?: 'enquiry' | 'demo';
  id?: string;
}

const field =
  'w-full rounded-btn border border-slate/35 bg-paper px-4 py-3 text-ink placeholder:text-slate/70 transition-colors focus:border-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/30';
const labelCls = 'block text-sm font-semibold text-navy';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EnquiryForm({ intent = 'enquiry', id = 'lead-form' }: Props) {
  const isDemo = intent === 'demo';
  const submitLabel = isDemo ? 'Book a free demo' : 'Send enquiry';
  const successTitle = isDemo ? 'Demo requested' : 'Enquiry received';
  const successBody = isDemo
    ? 'Thanks — your free demo request is in. A counsellor will call you to confirm a slot, usually within one working day.'
    : 'Thanks — we have your enquiry. A counsellor will reach out shortly, usually within one working day.';

  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ msg: string; tone: 'error' | 'slate' | '' }>({ msg: '', tone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const clearError = (name: string) =>
    setErrors((e) => {
      if (!e[name]) return e;
      const next = { ...e };
      delete next[name];
      return next;
    });

  const validate = (form: HTMLFormElement) => {
    const next: Record<string, string> = {};
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null)?.value.trim() ?? '';

    (['studentName', 'parentName', 'phone', 'grade', 'board', 'program'] as const).forEach((name) => {
      if (!get(name)) next[name] = 'This field is required.';
    });

    const phone = get('phone');
    if (phone && !next.phone) {
      const digits = phone.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 13) next.phone = 'Enter a valid phone number (at least 10 digits).';
    }

    const email = get('email');
    if (email && !emailRe.test(email)) next.email = 'Enter a valid email, or leave it blank.';

    return next;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ msg: '', tone: '' });

    const next = validate(form);
    if (Object.keys(next).length > 0) {
      setErrors(next);
      setStatus({ msg: 'Please fix the highlighted fields.', tone: 'error' });
      const firstBad = form.elements.namedItem(Object.keys(next)[0]) as HTMLElement | null;
      firstBad?.focus();
      return;
    }
    setErrors({});
    setSubmitting(true);
    setStatus({ msg: 'Sending…', tone: 'slate' });

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(form),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json?.message || 'Something went wrong.');
      setSuccess(true);
      setStatus({ msg: '', tone: '' });
      requestAnimationFrame(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    } catch (err) {
      setSubmitting(false);
      setStatus({
        msg: err instanceof Error ? err.message : 'Could not send. Please call us instead.',
        tone: 'error',
      });
    }
  };

  const errClass = (name: string) => cn(field, 'mt-1.5', errors[name] && 'border-orange-700');
  const FieldError = ({ name }: { name: string }) =>
    errors[name] ? <p className="mt-1 text-sm text-orange-700">{errors[name]}</p> : null;

  return (
    <form ref={formRef} id={id} className="space-y-5" noValidate onSubmit={onSubmit}>
      <input type="hidden" name="intent" value={intent} />
      {/* Web3Forms: submissions are emailed to the account tied to this access key. */}
      <input type="hidden" name="access_key" value="d12803be-3286-4862-84d6-68784d9e49cd" />
      <input
        type="hidden"
        name="subject"
        value={isDemo ? 'New free-demo request — Gravity Academy website' : 'New enquiry — Gravity Academy website'}
      />
      <input type="hidden" name="from_name" value="Gravity Academy Website" />
      {/* Web3Forms honeypot: bots tick it, humans never see it. */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {success ? (
        <div className="form-success rounded-card border border-navy/15 bg-paper-2 p-6">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange text-navy">
              <Icon name="check" size={22} />
            </span>
            <div>
              <h3 className="font-display text-display-sm text-navy">{successTitle}</h3>
              <p className="mt-1 text-slate">{successBody}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor={`${id}-student`}>
                Student name <span className="text-orange">*</span>
              </label>
              <input className={errClass('studentName')} id={`${id}-student`} name="studentName" type="text" autoComplete="name" onInput={() => clearError('studentName')} />
              <FieldError name="studentName" />
            </div>
            <div>
              <label className={labelCls} htmlFor={`${id}-parent`}>
                Parent name <span className="text-orange">*</span>
              </label>
              <input className={errClass('parentName')} id={`${id}-parent`} name="parentName" type="text" autoComplete="name" onInput={() => clearError('parentName')} />
              <FieldError name="parentName" />
            </div>
            <div>
              <label className={labelCls} htmlFor={`${id}-phone`}>
                Phone <span className="text-orange">*</span>
              </label>
              <input className={errClass('phone')} id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" onInput={() => clearError('phone')} />
              <FieldError name="phone" />
            </div>
            <div>
              <label className={labelCls} htmlFor={`${id}-email`}>
                Email <span className="font-normal text-slate">(optional)</span>
              </label>
              <input className={errClass('email')} id={`${id}-email`} name="email" type="email" autoComplete="email" onInput={() => clearError('email')} />
              <FieldError name="email" />
            </div>
            <div>
              <label className={labelCls} htmlFor={`${id}-grade`}>
                Class / Grade <span className="text-orange">*</span>
              </label>
              <select className={errClass('grade')} id={`${id}-grade`} name="grade" defaultValue="" onInput={() => clearError('grade')}>
                <option value="">Select class</option>
                {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <option key={g} value={`Class ${g}`}>
                    Class {g}
                  </option>
                ))}
              </select>
              <FieldError name="grade" />
            </div>
            <div>
              <label className={labelCls} htmlFor={`${id}-board`}>
                Board <span className="text-orange">*</span>
              </label>
              <select className={errClass('board')} id={`${id}-board`} name="board" defaultValue="" onInput={() => clearError('board')}>
                <option value="">Select board</option>
                {site.boards.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <FieldError name="board" />
            </div>
            <div>
              <label className={labelCls} htmlFor={`${id}-program`}>
                Program interested <span className="text-orange">*</span>
              </label>
              <select className={errClass('program')} id={`${id}-program`} name="program" defaultValue="" onInput={() => clearError('program')}>
                <option value="">Select program</option>
                {programs.map((p) => (
                  <option key={p.slug} value={p.name}>
                    {p.name}
                  </option>
                ))}
                <option value="Not sure yet">Not sure yet — help me choose</option>
              </select>
              <FieldError name="program" />
            </div>
            <div>
              <label className={labelCls} htmlFor={`${id}-time`}>
                Preferred time <span className="font-normal text-slate">(optional)</span>
              </label>
              <select className={cn(field, 'mt-1.5')} id={`${id}-time`} name="preferredTime" defaultValue="">
                <option value="">No preference</option>
                <option value="Morning">Morning (9 AM – 12 PM)</option>
                <option value="Afternoon">Afternoon (12 – 4 PM)</option>
                <option value="Evening">Evening (4 – 7:30 PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls} htmlFor={`${id}-message`}>
              Message <span className="font-normal text-slate">(optional)</span>
            </label>
            <textarea className={cn(field, 'mt-1.5')} id={`${id}-message`} name="message" rows={4} placeholder="Anything you'd like us to know?" />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button type="submit" variant="primary" size="lg" disabled={submitting}>
              {submitLabel}
            </Button>
            <p
              className={cn('text-sm', status.tone === 'error' && 'text-orange-700', status.tone === 'slate' && 'text-slate')}
              role="status"
              aria-live="polite"
            >
              {status.msg}
            </p>
          </div>
        </>
      )}
    </form>
  );
}
