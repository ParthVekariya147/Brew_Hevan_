const sendMail = require('./sendMail');

const sendBookingConfirmation = async (email, bookingDetails) => {
  const subject = '✅ Booking Confirmation – Thank You!';
  const text = `Hi ${bookingDetails.name}, your booking is confirmed.`;

  const html = `
    <h2>Booking Confirmed!</h2>
    <p>Hi ${bookingDetails.name},</p>
    <p>Here are your booking details:</p>
    <ul>
      <li><strong>Booking ID:</strong> ${bookingDetails.id}</li>
      <li><strong>Date:</strong> ${bookingDetails.date}</li>
      <li><strong>Time:</strong> ${bookingDetails.time}</li>
    </ul>
    <p>We look forward to serving you!</p>
  `;

  return sendMail(email, subject, text, html);
};

module.exports = sendBookingConfirmation;
