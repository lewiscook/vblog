import nodemailer from 'nodemailer'

const MAIL_FROM = process.env.MAIL_FROM || 'noreply@lcook.io'
const SITE_URL  = process.env.SITE_URL  || 'http://lcook.io'

// Use local sendmail if no SMTP host is configured (standard on Ubuntu with Postfix)
function createTransport() {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT) || 25,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth:   process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    })
  }
  // Fall back to local sendmail
  return nodemailer.createTransport({ sendmail: true })
}

export async function sendVerificationEmail(name, email, token) {
  const verifyUrl = `${SITE_URL}/verify?token=${token}`
  const transporter = createTransport()

  await transporter.sendMail({
    from:    `"VStoryBlog" <${MAIL_FROM}>`,
    to:      `"${name}" <${email}>`,
    subject: 'Confirm your VStoryBlog subscription',
    text: `Hi ${name},\n\nThanks for subscribing to VStoryBlog!\n\nPlease confirm your email by visiting:\n${verifyUrl}\n\nThis link expires in 24 hours.\n\nIf you did not subscribe, you can safely ignore this email.\n\n— VStoryBlog`,
    html: `
      <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;background:#0e0e12;color:#e8dfc8;padding:40px 32px;border-radius:8px;">
        <h1 style="color:#c8a84b;font-size:1.8rem;margin:0 0 4px;">VStoryBlog</h1>
        <p style="color:#6a6050;font-size:0.85rem;margin:0 0 32px;letter-spacing:0.1em;">YOUR STORY AWAITS</p>
        <p style="font-size:1rem;line-height:1.8;">Hi <strong>${name}</strong>,</p>
        <p style="font-size:1rem;line-height:1.8;color:#c8bfa8;">
          Thanks for subscribing! Please confirm your email address to complete your subscription.
        </p>
        <div style="text-align:center;margin:32px 0;">
          <a href="${verifyUrl}"
             style="background:linear-gradient(135deg,#c8a84b,#a07830);color:#0e0e12;text-decoration:none;
                    padding:14px 36px;border-radius:4px;font-weight:700;font-size:0.95rem;
                    letter-spacing:0.1em;display:inline-block;">
            Confirm Subscription
          </a>
        </div>
        <p style="font-size:0.82rem;color:#4a4035;line-height:1.6;">
          This link expires in 24 hours. If you did not subscribe to VStoryBlog, you can safely ignore this email.
        </p>
        <hr style="border:none;border-top:1px solid #2a2418;margin:24px 0;" />
        <p style="font-size:0.75rem;color:#3a3020;">© 2026 VStoryBlog · L. Cook</p>
      </div>
    `,
  })
}
