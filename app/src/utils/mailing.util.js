import { createTransport } from "nodemailer";
import __dirname from "../../utils.js";
import environment from "./env.util.js";
const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = environment;


async function sendEmail(data) {
   try {
      console.log(__dirname);
      const transport = createTransport({
         host: "smtp.gmail.com",
         port: 465,
         secure: true,
         auth: { user: GOOGLE_EMAIL, pass: GOOGLE_PASSWORD },
      });
      await transport.verify();
      await transport.sendMail({
         from: `CODER BACKEND <${GOOGLE_EMAIL}>`,
         to: data.to,
         subject: `USER ${data.email.toUpperCase()} REGISTERED!`,
         html: `
                <h1 style="color: blue"> Bienvenido a Kuro World! </h1>
                <p>VERIFY CODE para tu papi: ${data.code}</p>
            `,
      });
   } catch (error) {
      throw error;
   }
}

export default sendEmail;
