import dbConnect from "../../lib/dbConnect";
import { registerValidation } from "../../midleware/validate";
import User from "../../models/User"
import { generateToken } from "../../utils/Utils";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  // check request method
  switch (method) {
    case "POST":
      //get request data
      const { name, password, confirm_password, email } = req.body;

      // validation
      const { error } = registerValidation({ name, password, confirm_password, email } );

      if (error) return res.status(400).send(error.details[0].message);

      try {

        // check if email exist
        const checkEmail = await User.findOne({email:email}).exec()

        if(checkEmail) return res.status(422).json({success:false,message:"email address already taken"});

        // create user
        const user = await new User({
          name:name,
          email:email,
          password:password,
        })

        const token = await user.generateAuthToken()

        // send verification token to amil
        generateToken(user)
      
        // return response
        res.status(201).json({
          success: true,
          message:
            "registration is successful check your email to verify your account",
          data:user,
        });
      } catch (err) {
        res.status(400).send(err);
      }

      break;
    default:
      res.status(400).json({ success: false, message: "invalid request" });
      break;
  }
}
