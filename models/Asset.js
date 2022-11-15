import mongoose from "mongoose";

const AssetSchema = mongoose.Schema({
    name:{type:String,required:true}
})

module.exports =
  mongoose.models.Asset || mongoose.model("Asset", AssetSchema);