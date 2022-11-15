import mongoose from "mongoose";

const SettingSchema = mongoose.Schema({
    title:{type:String,required:false},
    email:{type:String,required:false},
    logo:{type:String,required:false},
    gmail_user:{type:String,required:false},
    gmail_pass:{type:String,required:false}
})

module.exports = mongoose.models.Setting || mongoose.model("Setting", SettingSchema);