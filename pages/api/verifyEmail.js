import dbConnect from "../../lib/dbConnect";
import User from "../../models/User"
import { generateToken } from "../../utils/Utils";

export default async function handler(req, res) {
  await dbConnect();

  // get request method
  const { method } = req;

  switch (method) {
    case "POST":
        // check request body
        const {email} = req.body

        // set email as required
        if(!email) res.status(422).json({success:false,message:"email is required"})

        // get user 
        const user  = User.findOne({email})

        // check if user exist 
        if(!user) res.status(400).json({success:false,message:"user not found"});

        // check if user is verified
        if(user.email_verified_at) res.status(422).json({success:false,message:"email already verified"});

        // generate token
        generateToken(user)

        res.status(201).json({success:true,message:"check your email to verify your account"});

      break;
    default:
      res.status(400).json({ success: false, message: "invalid request" });
      break;
  }
}
