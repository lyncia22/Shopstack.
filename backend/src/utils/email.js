const { Resend } = require('resend');

let resend = null;
// Let's add a clear debug message here
if (process.env.RESEND_API_KEY) {
  console.log("SUCCESS: RESEND_API_KEY was found!");
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  console.warn("RESEND_API_KEY not found. Email sending will be disabled.");
}

const sendOrderEmail = async (to, order) => {
  if (!resend) {
    console.log('Email sending is disabled. Would have sent to:', to);
    
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  
  const fromAddress = 'orders@notifications.shopstack.com';

  
  console.log("DEBUG: Sending email to:", to);
  console.log("DEBUG: From address:", fromAddress);
  console.log("DEBUG: Order ID:", order._id);
  console.log("DEBUG: Order total:", order.totalCents);

  try {
    await resend.emails.send({
      from: fromAddress,
      to: to, 
      subject: `Your ShopStack Order Confirmation #${order._id}`,
      html: `<h1>Thank you for your order!</h1><p>Your order total was $${(order.totalCents / 100).toFixed(2)}.</p>`,
    });
    console.log(`Order confirmation email sent successfully to: ${to}`);
  } catch (error) {
    console.error('Error sending email with Resend:', error);
  }
};

module.exports = { sendOrderEmail };