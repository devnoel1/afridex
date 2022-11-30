import dbConnect from "../../lib/dbConnect";
import User from "../../models/User"
import AccessToken from "../../models/AccessToken";
import { generateToken } from "../../utils/Utils";
import verifyEmailTmp from "../../emailTmps/verifyEmailTmp";

export default async function handler(req, res) {
  await dbConnect();

  // get request method
  const { method } = req;

  switch (method) {
    case "POST":
        // check request body
        const {email} = req.body

        // set email as required
        if(!email) return res.status(422).json({success:false,message:"email is required"})

        // get user 
        const user  = await User.findOne({ email: email });

        // check if user exist 
        if(!user) return res.status(400).json({success:false,message:"user not found"});

        // check if user is verified
        if(user.verified) return res.status(422).json({success:false,message:"email already verified"});

        // generate token
        const secretToken = await generateToken();

        const sk = await new AccessToken({
          secretToken: secretToken,
          email: email,
        });

        sk.save()

        verifyEmailTmp(user, secretToken);

       res.status(201).json({success:true,message:"check your email to verification token"});

      break;
    default:
      res.status(400).json({ success: false, message: "invalid request" });
      break;
  }
}
