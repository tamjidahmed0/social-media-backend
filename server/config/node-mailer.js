import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nishitaislam2075@gmail.com',
      pass: 'ogwintllofwbpahb'
    }
  })


export default {transporter}