import { loginValidation } from "../../midleware/validate";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "POST":
      const { email, password } = req.body;

      const { error } = loginValidation({ email, password });

      if (error) return res.status(400).send(error.details[0].message);

      try {
        const user = await User.findOne({ email: email });

        if (!user)
          return res
            .status(400)
            .json({ success: false, message: "invalid creadentails" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
          return res
            .status(400)
            .json({ success: false, message: "invalid creadentails" });

        const token = await user.generateAuthToken();

        // return response
        res.status(201).json({
          success: true,
          message: "loggin successfully",
          data: user,
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
