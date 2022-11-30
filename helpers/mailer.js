const nodemailer = require('nodemailer');
import { getSettings } from "./getSettings" 
 
const transport = nodemailer.createTransport({
    service : 'Gmail',
    auth : { 
        // user : getSettings.gmail_user, 
        // pass : getSettings.gmail_pass
        user: "yoitsburby@gmail.com",
        pass:"fkozpvltmjznlrxp"
    }, 
    tls: { 
        rejectUnauthorized: false 
    } 
})

function sendEmail(from, to, subject, html ) { 
    return new Promise((resolve, reject) => { 
        transport.sendMail({from, to, subject, html}, (err, info) => { 
            if(err) reject(err) 

            resolve(info) 
        })
    })
}

module.exports = sendEmail;