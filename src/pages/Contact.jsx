import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import Seo from '../components/Seo'
import { ease, SplitText } from '../components/Motion'
import { site } from '../data/site'
import { projectBySlug } from '../data/projects'
import { submitEnquiry, mailtoFor } from '../utils/enquiry'

const TYPES = ['A work on this site', 'A commission', 'An exhibition or collaboration', 'Press', 'Something else']
const EMPTY = { name: '', email: '', phone: '', type: '', location: '', message: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Enter your name.'
  if (!v.email.trim()) e.email = 'Enter your email address so we can reply.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter an email address in the format name@example.com.'
  if (v.phone && !/^[+()\d\s-]{7,}$/.test(v.phone.trim())) e.phone = 'Enter a phone number using digits, spaces and + only.'
  if (!v.type) e.type = 'Choose what you are writing about.'
  if (v.message.trim().length < 20) e.message = 'Write a little more, at least 20 characters.'
  return e
}

export default function Contact() {
  // /contact?work=<slug> arrives from a work's page and starts the message about that work.
  const [params] = useSearchParams()
  const work = projectBySlug[params.get('work')]
  const initial = work
    ? { ...EMPTY, type: 'A work on this site', message: `I would like to know more about ${work.title}.` }
    : EMPTY
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | failed
  const [result, setResult] = useState(null)
  const formRef = useRef(null)

  const set = (name) => (e) => {
    const next = { ...values, [name]: e.target.value }
    setValues(next)
    if (touched[name] || errors[name]) setErrors(validate(next))
  }
  const blur = (name) => () => {
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validate(values))
  }

  async function onSubmit(e) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    setTouched(Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true])))
    const first = ['type', 'name', 'email', 'phone', 'message'].find((k) => found[k])
    if (first) {
      formRef.current?.querySelector(`[name="${first}"]`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const r = await submitEnquiry(values)
      setResult({ ...r, data: values })
      setStatus('done')
    } catch {
      setStatus('failed')
    }
  }

  const show = (name) => touched[name] && errors[name]

  return (
    <>
      <Seo title="Contact" description="Write to Kiran Adate, sculptor, Mumbai: about a work, a commission, an exhibition or press." />
      <header className="wrap pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+5rem)]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <SplitText as="h1" className="display col-span-12 text-[clamp(3.4rem,1.8rem+7vw,9rem)] font-light leading-[0.86] md:col-span-8" text="Contact" immediate delay={0.3} />
          <p className="col-span-12 max-w-[44ch] self-end text-[1.04rem] md:col-span-4">
            About a work on this site, a commission, an exhibition or press. Studio visits are by appointment.
          </p>
        </div>
      </header>

      <section className="wrap grid grid-cols-12 gap-x-6 gap-y-20 py-20 md:py-28">
        <div className="col-span-12 lg:col-span-7">
          <AnimatePresence mode="wait">
            {status === 'done' ? (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }} role="status" className="border-t border-ink pt-8">
                {result?.sent ? (
                  <>
                    <SplitText as="h2" className="display text-[clamp(2rem,1.4rem+2vw,3rem)] leading-tight" text="Thank you." />
                    <p className="mt-4 max-w-[48ch]">Your message has reached the studio, {result.data.name.split(' ')[0]}. The reply will come from {site.email}.</p>
                  </>
                ) : (
                  <>
                    <SplitText as="h2" className="display text-[clamp(2rem,1.4rem+2vw,3rem)] leading-tight" text="Your message is ready to send." />
                    <p className="mt-4 max-w-[52ch]">
                      This website is not yet connected to the studio's inbox, so nothing has been sent. Open the message in your email app to send it as it is.
                    </p>
                    <a href={mailtoFor(result.data)} className="arrow-link mt-8">Open in email</a>
                  </>
                )}
                <button
                  type="button"
                  className="text-link ml-0 mt-8 block text-[0.95rem]"
                  onClick={() => {
                    setValues(EMPTY)
                    setTouched({})
                    setErrors({})
                    setStatus('idle')
                  }}
                >
                  Write another message
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" ref={formRef} onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }}>
                <fieldset className="border-0 p-0">
                  <legend className="display mb-6 text-[1.7rem]">What are you writing about?</legend>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-describedby={show('type') ? 'type-error' : undefined} aria-invalid={!!show('type')}>
                    {TYPES.map((t) => (
                      <label key={t} className={`cursor-pointer rounded-full border px-4 py-2 text-[0.9rem] transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-geru ${values.type === t ? 'border-geru bg-geru text-paper' : 'border-ink/20 hover:border-ink'}`}>
                        <input type="radio" name="type" value={t} checked={values.type === t} onChange={set('type')} onBlur={blur('type')} className="sr-only" />
                        {t}
                      </label>
                    ))}
                  </div>
                  <ErrorText id="type-error" msg={show('type')} />
                </fieldset>

                <div className="mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-2">
                  <Field label="Name" name="name" required value={values.name} onChange={set('name')} onBlur={blur('name')} error={show('name')} autoComplete="name" />
                  <Field label="Email" name="email" type="email" required value={values.email} onChange={set('email')} onBlur={blur('email')} error={show('email')} autoComplete="email" inputMode="email" />
                  <Field label="Phone" name="phone" type="tel" hint="Optional" value={values.phone} onChange={set('phone')} onBlur={blur('phone')} error={show('phone')} autoComplete="tel" />
                  <Field label="City" name="location" hint="Optional" value={values.location} onChange={set('location')} onBlur={blur('location')} autoComplete="address-level2" />
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="caption block">Message <span aria-hidden="true">*</span></label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={values.message}
                      onChange={set('message')}
                      onBlur={blur('message')}
                      aria-invalid={!!show('message')}
                      aria-describedby={show('message') ? 'message-error' : 'message-hint'}
                      placeholder="A few lines about what you have in mind. Images and drawings can follow by email."
                      className="mt-2 w-full resize-y border-0 border-b border-ink/30 bg-transparent py-3 text-[1rem] placeholder:text-ink-soft/70 focus:border-ink focus:outline-none focus-visible:outline-2 aria-[invalid=true]:border-[#9a3b2a]"
                    />
                    {!show('message') && <p id="message-hint" className="caption mt-2">At least 20 characters.</p>}
                    <ErrorText id="message-error" msg={show('message')} />
                  </div>
                </div>

                {status === 'failed' && (
                  <p role="alert" className="mt-8 text-[0.95rem] text-[#9a3b2a]">
                    The message could not be sent. Check your connection and try again, or email {site.email} directly.
                  </p>
                )}

                <div className="mt-12 flex flex-wrap items-center gap-6">
                  <button type="submit" disabled={status === 'sending'} className="btn btn-solid disabled:opacity-60">
                    {status === 'sending' ? 'Sending' : 'Send message'}
                  </button>
                  <p className="caption">Fields marked * are required.</p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <aside className="col-span-12 lg:col-span-4 lg:col-start-9" aria-label="Contact details">
          <dl className="space-y-8">
            <div>
              <dt className="caption">Email</dt>
              <dd className="mt-1.5">
                <a href={`mailto:${site.email}`} className="text-link block w-fit text-[1.1rem]">{site.email}</a>
              </dd>
            </div>
            <div>
              <dt className="caption">Phone</dt>
              <dd className="mt-1.5">
                <a href={`tel:${site.phones[0].tel}`} className="text-link block w-fit text-[1.1rem] tabular-nums">{site.phones[0].label}</a>
                <a href={site.whatsapp} target="_blank" rel="noreferrer" className="text-link mt-2 inline-block text-[0.95rem]">WhatsApp</a>
              </dd>
            </div>
            <div>
              <dt className="caption">Studio</dt>
              <dd className="mt-1.5 text-[1rem]">
                <address className="not-italic">
                  {site.workshop.lines.map((l) => <span key={l} className="block">{l}</span>)}
                </address>
                <a href={site.workshop.map} target="_blank" rel="noreferrer" className="text-link mt-2 inline-block text-[0.9rem]">Open in Maps</a>
                <p className="caption mt-2">{site.visits}</p>
              </dd>
            </div>
            {site.representation && (
              <div>
                <dt className="caption">Represented by</dt>
                <dd className="mt-1.5">
                  <a href={site.representation.href} target="_blank" rel="noreferrer" className="text-link text-[1.1rem]">
                    {site.representation.name}, {site.representation.city}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </aside>
      </section>
    </>
  )
}

function Field({ label, name, hint, error, required, ...rest }) {
  const describedBy = error ? `${name}-error` : undefined
  return (
    <div>
      <label htmlFor={name} className="caption block">
        {label} {required && <span aria-hidden="true">*</span>}
        {hint && <span className="text-ink-soft/80"> ({hint.toLowerCase()})</span>}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className="mt-2 w-full border-0 border-b border-ink/30 bg-transparent py-3 text-[1rem] focus:border-ink focus:outline-none focus-visible:outline-2 aria-[invalid=true]:border-[#9a3b2a]"
        {...rest}
      />
      <ErrorText id={`${name}-error`} msg={error} />
    </div>
  )
}

function ErrorText({ id, msg }) {
  if (!msg) return null
  return <p id={id} className="mt-2 text-[0.85rem] text-[#9a3b2a]">{msg}</p>
}
