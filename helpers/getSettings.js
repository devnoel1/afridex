import Setting from "../models/Settings"

export const getSettings = async ()=>{
    const settings = await Setting.findOne()

    return settings;
}