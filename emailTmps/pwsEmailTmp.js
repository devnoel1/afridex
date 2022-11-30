import { getSettings } from "../helpers/getSettings";
import  sendEmail from "../helpers/mailer"

const pwsEmailTmp = async (user, token) => {
  const html = `Hello ${user.name},
    <br/>
    <br>
    your password reset code iz
    <br/>
    <br/>
    <strong>${token}</strong> .
    <p>please ignore this mail if you did not request for password reset</p>
    <br><br>
    Cheers,
    <br>
    <strong>Team ${getSettings.title}</strong>
    `;

  await sendEmail(
    `${getSettings.email}`,
    user.email,
    `${getSettings.title}: PAasword Reset`,
    html
  );
};

module.exports = pwsEmailTmp;
