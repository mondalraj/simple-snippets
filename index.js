const nodemailer = require("nodemailer");

const CLIENT_ID = process.env.CLIENT_ID;
const CLEINT_SECRET = process.env.CLEINT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

async function sendMail() {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "rajib.mondal@simply-jet.ch",
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        accessToken: ACCESS_TOKEN,
      },
    });

    const mailOptions = {
      from: "Rajib from Simply Jet <rajib.mondal@simply-jet.ch>",
      bcc: "mondalrajib2002@gmail.com, amit.kumar@simply-jet.ch",
      subject: "Operator Mass Email Updated again",
      text: "Hello from gmail email using API",
      html: "<p>Dear {operator_name},</p><p><br>I am writing on behalf of Simplyjet, a Private Jet Broker Company. We are currently in search of a private jet that can accommodate the requirements of our esteemed client. We would like to know if you have any aircraft available on the following dates:<br>Dates: [insert dates]<br>Route: From [insert departure location] to [insert arrival location]<br>Amenities: We would require a private jet that can accommodate [insert required amenities such as Wi-Fi, in-flight entertainment, comfortable seating, etc.]<br>If you have any aircraft that matches our requirements, please provide us with a quote for the cost of the flight. Additionally, we would like to know the available range of your private jet and any other relevant information that you think we need to know.<br>We would appreciate it if you could get back to us as soon as possible, as time is of the essence.<br>Thank you for your time and assistance in this matter.</p><p><br>Best regards,<br>Rajib Mondal<br>Simplyjet Representative</p>",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log("Email sent...", result))
  .catch((error) => console.log(error.message));
