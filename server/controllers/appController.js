import fs from 'fs'
//import schema
import userschema from '../models/user.js'
//import bcrypt for password hass or compire
import bcrypt from 'bcrypt'
//import nodemail
import nodemailerConfig from '../config/node-mailer.js'
//import jwt token
import jwt  from 'jsonwebtoken'
import express from 'express'
const app = express()



//post request for registration
export const register = async (req, res) =>{
  try {
     const {name, email, username, password } = req.body
    //check username and email exist or not
      userschema.findOne({$or:[{username:username}, {email:email} ] }, (err , user)=>{
      if(err) return res.send(err)
      if(user) return res.status(409).json({error: user.email === req.body.email ? 'Email aready exist': 'username already exist'})

      //trim white space
      if(!email.trim() || !username.trim() || !password.trim()){
        return res.status(400).json({ error: "All fields are required and cannot be blank" });
      }else{
     //if username and email not exist then save to database
     req.session.userInfo = req.body
     console.log(req.session.userInfo)
     if (req.session.userInfo) {
      // generate random 6 digit code
      const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
      const otp = {
        code: randomNumber,
        expiresAt: Date.now() + (5 * 60 * 1000) // OTP expires in 5 min
      }
      //mail details
      const mailOptions = {
        from: 'chat app <nishitaislam2075@gmail.com>',
        to: `${email}`,
        subject: 'OTP for your account',
       
      }
      //custom email template
      fs.readFile('./config/nodemailer-template/otp-template.html' , 'utf-8' , (err , data)=>{
      if (err) {
      console.error(err);
      return;
      }
      //dynamic code replace
      mailOptions.html = data.replace(/{OTP}/g, otp.code).replace(/{NAME}/g, name)
      //send mail
      nodemailerConfig.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
      });

      } )
      //store otp to session variables
      req.session.otp = otp
      //store email to session variables
      req.session.user_id = email
      res.status(201).send({msg:'An OTP sent to your email!', id: req.session.user_id})
      console.log(req.session.otp)
     } else { 
      res.status(401).send({msg:'OTP not sent, something wrong!'})
     }
      }

    })

  } catch (error) {
    res.status(500).send(error)
  }

}


//otp verification
export const otp = async (req, res)=>{
   const {otp} = req.body
    try {
      //otp expiration
      const otpExp = Date.now() >= req.session.otp.expiresAt
      //session otp
      const sessOtp = req.session.otp.code
      //store data to a variables that comes from session
      const userData = new userschema(req.session.userInfo) 
      //destructure email
      const {email} = req.session.userInfo
      console.log(sessOtp)
      if (req.session.user_id === email && sessOtp === otp  ) {
      if(otpExp){
        delete req.session.otp.code
        res.status(401).send({msg:'otp expired!!'})
      }else{
        res.status(201).send({msg:'successfully verified!'})
        console.log("OTP is valid")
        //id verified then save to database
        userData.save()
      }
      }else { 
        res.status(401).send({msg:'OTP not matched'})
        console.log("OTP not matched")
      }
    } catch (error) {
      console.log(error)
    }
      
}


//post request for login
export const login = async(req , res) =>{
  
  try {
    const {username, email, password} = req.body
    userschema.findOne({$or:[{username:username},{email:email}]}, async (err, user) =>{
    if(err) return res.status(400).send(err)
    if(!user) return res.status(400).send({'msg':'user not founds'})
 
    //compare the entered password with database password
  bcrypt.compare(password, user.password ,(err , result)=>{
      if(err) return res.status(400).send(err)
      if(!result) return res.status(400).json({ msg: "Invalid credentials" })
      req.session.user_id = user._id
      res.json({ msg: " Logged In Successfully", sessions:req.session.user_id })
      
      // if(result) {
       
      //   res.status(201).send({'msg':'login success'})
      //   req.session.user_id = user._id
      //  console.log(req.session.user_id)
      
      // }else{
      //    res.status(401).send({'msg':'incorrect username or password'})
        

      // } 
      
    })

  // bcrypt.compare(password, user.password).then((isMatch)=>{
  //   if(!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
  //   req.session.user_id = user._id
  //   console.log(req.session.user_id)
  //   res.json({ msg: " Logged In Successfully" });
  // })




     
    }) 

   
  } catch (error) {
     
    res.send(error)
   }
}



// admin dashbord

export const adminDashboard = async(req, res)=>{
  try {
    const {email} = req.session.userInfo
    if ( req.session.user_id || req.session.user_id === email && req.session.otp.code ) {
      console.log(req.session.user_id)
      res.send('Welcome to the dashboard');
    } else {
      res.send('Please login to access the dashboard');
    }
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}

export const logOut = (req ,res) =>{
   req.session.destroy((error)=>{
    
    res.clearCookie('login')
    res.send('logout successfull')
   });
}


 
// export const ip = app.use((req, res, next) => {
  
//     console.log(req.ip);
//     next();
//   });


