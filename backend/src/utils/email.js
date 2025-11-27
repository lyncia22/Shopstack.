const { Resend } = require('resend');

let resend = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  console.warn("RESEND_API_KEY not found. Email sending will be disabled.");
}

const sendOrderEmail = async (to, order) => {
  if (!resend) {
    console.log('Email sending is disabled. Would have sent to:', to);
    return;
  }

  // You must verify a domain with Resend to use a 'from' address.
  // See: https://resend.com/domains
  const fromAddress = 'onboarding@resend.dev';

  // --- For Testing Purposes ---
  // We are overriding the 'to' address to send a test email.
  // IMPORTANT: Replace this with the email you used to sign up for Resend.
  const testToAddress = 'YOUR_RESEND_SIGNUP_EMAIL@example.com';

  try {
    await resend.emails.send({
      from: fromAddress,
      to: testToAddress, // Using the hardcoded test address
      subject: `Your ShopStack Order Confirmation #${order._id}`,
      html: `<h1>Thank you for your order!</h1><p>Your order total was $${(order.totalCents / 100).toFixed(2)}.</p>`,
    });
  } catch (error) {
    console.error('Error sending email with Resend:', error);
  }
};

module.exports = { sendOrderEmail };