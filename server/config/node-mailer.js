import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv' 
dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASS
    }
  })


export default {transporter}