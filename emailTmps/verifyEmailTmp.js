import { getSettings } from "../helpers/getSettings";
import  sendEmail from "../helpers/mailer"

const verifyEmailTmp = async (user, token) => {
  const html = `Hello ${user.name},
    <br/>
    <br>
    Thank you for your registration. 
    <br/>
    <br/>
    <strong>${token}</strong> is your verification code to continue your signup.
    <br><br>
    Cheers,
    <br>
    <strong>Team ${getSettings.title}</strong>
    `;

  await sendEmail(
    `${getSettings.email}`,
    user.email,
    `${getSettings.title}: Please activate your account`,
    html
  );
};

module.exports = verifyEmailTmp;
