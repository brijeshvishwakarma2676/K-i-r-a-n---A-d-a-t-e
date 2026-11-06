import { site } from '../data/site'

/*
  Sends an enquiry. This is where a form service or API is connected later
  (for example Formspree, Web3Forms, an email API or the artist's own endpoint).
  Until then it resolves without sending, and the contact page offers an email draft instead.
*/
export async function submitEnquiry(data) {
  const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 700))
    return { sent: false }
  }
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('The enquiry could not be sent.')
  return { sent: true }
}

export function mailtoFor(data) {
  const subject = data.type
  const lines = [data.message, '', `Name: ${data.name}`, `Email: ${data.email}`]
  if (data.phone) lines.push(`Phone: ${data.phone}`)
  if (data.location) lines.push(`City: ${data.location}`)
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
}
