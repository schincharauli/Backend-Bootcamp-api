import dotenv from "dotenv";
import mailTransport from "./settings.js";
import { welcomeHtml } from "./templates.js";

dotenv.config();

const send = (to, subject, html) => {
  const options = {
    to,
    subject,
    html,
    from: process.env.GMAIL_USER,
  };
  return mailTransport.sendMail(options);
};

export default send;

export const registrationWelcome = async (to, name) => {
  const html = welcomeHtml(name);
  return send(to, "Welcome to our Backend Bootcamp", html);
};
