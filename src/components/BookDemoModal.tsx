'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';
import Icon from './Icon';

/**
 * Global "Book a free demo" popup. Rendered once by DemoModalProvider and driven
 * by `isOpen`/`onClose`; every "Book a free demo" CTA calls the provider's open().
 * Asks the four fields the client specified: student name · grade · phone + email
 * · board. Submits to Web3Forms (emailed) — UNCHANGED from the Astro build.
 * Accessible: role=dialog, Escape + backdrop close, scroll lock, focus handling.
 */
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const field =
  'w-full rounded-btn border border-slate/35 bg-paper px-4 py-2.5 text-ink placeholder:text-slate/70 transition-colors focus:border-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/30';
const labelCls = 'block text-sm font-semibold text-navy';
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookDemoModal({ isOpen, onClose }: Props) {
  const [rendered, setRendered] = useState(false);
  const [shown, setShown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ msg: string; tone: 'error' | 'slate' | '' }>({ msg: '', tone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Enter / exit animation driven by isOpen. On close (250ms out) reset the form
  // so the next open starts fresh.
  useEffect(() => {
    if (isOpen) {
      lastFocused.current = document.activeElement as HTMLElement;
      setRendered(true);
      const r = requestAnimationFrame(() => setShown(true));
      document.body.style.overflow = 'hidden';
      return () => cancelAnimationFrame(r);
    }
    setShown(false);
    document.body.style.overflow = '';
    const t = window.setTimeout(() => {
      setRendered(false);
      setSuccess(false);
      setErrors({});
      setStatus({ msg: '', tone: '' });
      setSubmitting(false);
      formRef.current?.reset();
    }, 250);
    lastFocused.current?.focus?.();
    return () => window.clearTimeout(t);
  }, [isOpen]);

  // Focus the first field on open; the Done button once submitted.
  useEffect(() => {
    if (!rendered || !isOpen) return;
    if (success) doneRef.current?.focus();
    else firstFieldRef.current?.focus();
  }, [rendered, isOpen, success]);

  // Escape closes.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const clearError = (name: string) =>
    setErrors((e) => {
      if (!e[name]) return e;
      const next = { ...e };
      delete next[name];
      return next;
    });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null)?.value.trim() ?? '';

    const next: Record<string, string> = {};
    (['studentName', 'grade', 'phone', 'board'] as const).forEach((name) => {
      if (!get(name)) next[name] = 'Required.';
    });
    const phone = get('phone');
    if (phone && !next.phone) {
      const digits = phone.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 13) next.phone = 'Enter a valid phone number.';
    }
    const email = get('email');
    if (email && !emailRe.test(email)) next.email = 'Enter a valid email or leave blank.';

    if (Object.keys(next).length > 0) {
      setErrors(next);
      (form.elements.namedItem(Object.keys(next)[0]) as HTMLElement | null)?.focus();
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
    <div
      id="demo-modal"
      className={cn('fixed inset-0 z-[80]', !rendered && 'hidden')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
    >
      <div
        className={cn('demo-backdrop absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300', !shown && 'opacity-0')}
        onClick={onClose}
      />

      <div className="absolute inset-0 grid place-items-center overflow-y-auto p-4">
        <div
          className={cn(
            'demo-panel relative w-full max-w-md rounded-card bg-paper p-6 shadow-lift transition-all duration-300 ease-fall sm:p-8',
            !shown && 'translate-y-4 scale-95 opacity-0'
          )}
        >
          <button
            type="button"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-btn text-slate hover:bg-paper-2 hover:text-navy"
            aria-label="Close"
            onClick={onClose}
          >
            <Icon name="x" size={20} />
          </button>

          {!success ? (
            <div className="demo-form-wrap">
              <p className="eyebrow">Free demo</p>
              <h2 id="demo-modal-title" className="mt-2 font-display text-display-sm text-navy">
                Book a free demo
              </h2>
              <p className="mt-1 text-sm text-slate">Tell us a little about the student and we’ll call you to fix a slot.</p>

              <form ref={formRef} className="mt-5 space-y-4" noValidate onSubmit={onSubmit}>
                <input type="hidden" name="intent" value="demo" />
                <input type="hidden" name="program" value="Free demo (popup)" />
                {/* Web3Forms: submissions are emailed to the account tied to this access key. */}
                <input type="hidden" name="access_key" value="d12803be-3286-4862-84d6-68784d9e49cd" />
                <input type="hidden" name="subject" value="New free-demo request — Gravity Academy website" />
                <input type="hidden" name="from_name" value="Gravity Academy Website" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

                <div>
                  <label className={labelCls} htmlFor="demo-student">
                    Name of student <span className="text-orange">*</span>
                  </label>
                  <input ref={firstFieldRef} className={errClass('studentName')} id="demo-student" name="studentName" type="text" autoComplete="name" onInput={() => clearError('studentName')} />
                  <FieldError name="studentName" />
                </div>

                <div>
                  <label className={labelCls} htmlFor="demo-grade">
                    Grade <span className="text-orange">*</span>
                  </label>
                  <select className={errClass('grade')} id="demo-grade" name="grade" defaultValue="" onInput={() => clearError('grade')}>
                    <option value="">Select grade</option>
                    {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                      <option key={g} value={`Grade ${g}`}>
                        Grade {g}
                      </option>
                    ))}
                  </select>
                  <FieldError name="grade" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="demo-phone">
                      Phone no. <span className="text-orange">*</span>
                    </label>
                    <input className={errClass('phone')} id="demo-phone" name="phone" type="tel" inputMode="tel" placeholder="10-digit mobile" onInput={() => clearError('phone')} />
                    <FieldError name="phone" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="demo-email">
                      Email ID
                    </label>
                    <input className={errClass('email')} id="demo-email" name="email" type="email" autoComplete="email" placeholder="Optional" onInput={() => clearError('email')} />
                    <FieldError name="email" />
                  </div>
                </div>

                <div>
                  <label className={labelCls} htmlFor="demo-board">
                    Board <span className="text-orange">*</span>
                  </label>
                  <select className={errClass('board')} id="demo-board" name="board" defaultValue="" onInput={() => clearError('board')}>
                    <option value="">Select board</option>
                    {site.boards.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  <FieldError name="board" />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="demo-submit w-full rounded-btn bg-orange px-5 py-3 font-display font-semibold text-navy shadow-soft transition-all duration-200 ease-fall hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/45 disabled:opacity-60"
                >
                  Book a free demo
                </button>
                <p
                  className={cn('text-center text-sm', status.tone === 'error' && 'text-orange-700', status.tone === 'slate' && 'text-slate')}
                  role="status"
                  aria-live="polite"
                >
                  {status.msg}
                </p>
              </form>
            </div>
          ) : (
            <div className="demo-success py-4 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-orange text-navy">
                <Icon name="check" size={30} />
              </span>
              <h2 className="mt-4 font-display text-display-sm text-navy">Demo requested</h2>
              <p className="mt-2 text-slate">
                Thanks! A counsellor will call you shortly to confirm a slot — usually within one working day.
              </p>
              <button
                ref={doneRef}
                type="button"
                className="mt-6 rounded-btn bg-navy px-6 py-3 font-display font-semibold text-white hover:bg-navy-800"
                onClick={onClose}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
