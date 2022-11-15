import randomstring from "randomstring"
import VerifyUser from "../models/VerifyUser"
import { verifyEmailTmp } from "../emailTmps/verifyEmailTmp"
import dbConnect from "../lib/dbConnect";


export const generateToken = async (user)=>{

  await dbConnect();

    // generate token
    let secretToken = randomstring.generate({
        length: 6,
        charset: 'numeric'
      });

    //   store token
      await new VerifyUser({
        token:secretToken,
        user:user
      })

    //   send email
    verifyEmailTmp(user,secretToken)
}