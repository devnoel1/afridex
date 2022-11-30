import randomstring from "randomstring"
import VerifyUser from "../models/AccessToken"
import verifyEmailTmp  from "../emailTmps/verifyEmailTmp"
import dbConnect from "../lib/dbConnect";


export const generateToken = ()=>{

  // await dbConnect();

    // generate token
    const secretToken = randomstring.generate({
        length: 4,
        charset: 'numeric'
      });

    //   store token
      // await new VerifyUser({
      //   token:secretToken,
      //   user:user._id
      // })

    //   send email

    return secretToken
    
}