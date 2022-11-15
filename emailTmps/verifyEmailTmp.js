import { getSettings } from "../helpers/getSettings";

export const verifyEmailTmp = async (user, token) => {
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
    <strong>Team ${getSettings.name}</strong>
    `;

  await sendEmail(
    `${getSettings.email}`,
    user.email,
    `${getSettings.name}: Please activate your account`,
    html
  );
};

module.exports = verifyEmailTmp;
