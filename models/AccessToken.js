import mongoose from "mongoose";

const AccessTokenSchema = new mongoose.Schema({
  secretToken: { type: String, required: true },
  email: {type:String}
});

mongoose.models = {};
var AccessToken =  mongoose.model("AccessToken", AccessTokenSchema);

export default AccessToken
  
