import fs from 'fs'
//user otp schema
import userOtp from '../models/otp.js'
//import schema
import userschema from '../models/user.js'

import conversationSchema from '../models/conversation.js'

import messageSchema from '../models/message.js'
import profileSchema from '../models/profile.js'
import disableSchema from '../models/disable.js'
import videoCountSchema from '../models/videoCount.js'

import tf from '@tensorflow/tfjs-node'
import path from 'path'

//import bcrypt for password hash or compire
import bcrypt from 'bcrypt'
//import nodemail
import nodemailerConfig from '../config/node-mailer.js'
//import jwt token
import jwt from 'jsonwebtoken'



import moment from 'moment'

import multer from 'multer';










// // user Registration
// export const register = async (req, res) =>{
//   try {
//      const {name, email, username, password } = req.body
//     //check username and email exist or not
//       userschema.findOne({$or:[{username:username}, {email:email} ] }, (err , user)=>{
//       if(err) return res.send(err)
//       if(user) return res.status(409).json({msg: user.email === req.body.email ? 'Email aready exist': 'username already exist'})

//       //trim white space
//       if(!email.trim() || !username.trim() || !password.trim()){
//         return res.status(400).json({ msg: "All fields are required and cannot be blank" })
//       }else{
//      //if username and email not exist then save to database
//      if (req.body) {
//       // generate random 6 digit code
//       const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
//       const otp = randomNumber
//       //jwt token sign
//       const token = jwt.sign({
//         username : username
//     }, process.env.JWT_SECRET , { expiresIn : "3min"})
      
//       //store all data to user otp collection
//       const userotp = new userOtp({
//         name:name,
//         username:username,
//         email:email,
//         password:password,
//         otp: otp,
//         token:token
//       })

//       //after add info save it for temporary
//       userotp.save()

//       //mail details
//       const mailOptions = {
//         from: `chat app <${process.env.GMAIL}>`,
//         to: `${email}`,
//         subject: 'OTP for your account',
       
//       }
//       //custom email template
//       fs.readFile('./config/nodemailer-template/otp-template.html' , 'utf-8' , (err , data)=>{
//       if (err) {
//       console.error(err);
//       return;
//       }
//       //dynamic code replace in html template
//       mailOptions.html = data.replace(/{OTP}/g, otp).replace(/{NAME}/g, name)
//       //send mail
//       nodemailerConfig.transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//       });

//       } )
//       res.status(201).send({msg:'An OTP sent to your email!', otpPage:true, token: token})
//       console.log(otp)
//      } else { 
//       res.status(401).send({msg:'OTP not sent, something wrong!'})
//      }
//       }

//     })

//   } catch (error) {
//     res.status(500).send(error)
//   }

// } 


//otp verification
// export const otp = async (req, res)=>{

//   try {
//       //check undefiend headers
//       if(req.headers.authorization === undefined){
//         res.status(400).send({msg:'Need token'})
//       }else{
//         //collect otp from body
//       const otp = req.body
//         //split the bearer token
//         let token
//         const {authorization} = req.headers
//         token = authorization.split(' ')[1]
       
//         //verify the jwt token with jwt secret
//         jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
//           if(err) return res.status(400).send({msg:'OTP expired'}) 
//           if(user){

// console.log(otp.otp)
//           //find the user in otp collection using token
//           userOtp.findOne({ token:token }, (err, users) => {
//           if(err) return res.send('err')
//           if(users){
//           //if find then match the token
//           if(users.token === token) {

//             if(Object.keys(otp.otp).length === 0){
//               res.status(400).send({msg:'please enter code'})
//             }else{
//                 //compare the pass that store in database as an encryped form
//                 bcrypt.compare(otp.otp, users.otp , (err, result)=>{
//                   if(err) return res.status(400).send({msg:'error'})
//                   if(result){
//                   //if success then find it and delete using token
//                    userOtp.findOneAndDelete({token:token}, (err, success)=>{
//                     if(err) return res.status(400).send({msg:'Error'})
//                     if(success){
//                   //Refresh Token
//                     const refreshToken = jwt.sign({
//                         username : success.username
//                     }, process.env.JWT_SECRET_REFRESH , { expiresIn : "1y"});
//                   //after delete stored data to main collection
//                    const userData = new userschema({ 
//                       name:success.name,
//                       username:success.username,
//                       email:success.email,
//                       password:success.password,
//                       refreshToken: refreshToken
                  
//                     })
//                     //saved user
//                     userData.save((err,saved)=>{
//                       if(err) return res.status(400).send({msg:'Error'})
//                       if(saved){
//                          //jwt access token sign
//                           const token = jwt.sign({
//                           username : saved.username
//                           }, process.env.JWT_SECRET , { expiresIn : "3min"});


//                           const profile = new profileSchema({
//                             Id:saved._id,
//                             profilePic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
//                             name:saved.name,
//                             username:saved.username
//                           })

//                           profile.save()

//                         res.status(201).send({msg:'verified' , otpPage:false, AccessToken:token, RefreshToken:refreshToken})
//                         console.log(saved)
//                       }
//                     })
      
//                     }
//                    }) 
      
//                   }else{
//                     res.status(404).send({msg:'invalid code'})
                    
//                   }
//                 })
//             }



                  
//           }
      
//         }else{
//           res.status(404).send({msg:'OTP expired or invalid!'})
//         }
      
//         })
            

//           }else{

          


//            res.status(400).send({msg:'otp expired'})
//           }
//         })

      
        
//       } 

//     } catch (error) {
     
//       console.log(error)
//     }
      
// }



// export const otp = async(req, res) =>{
//   const {otp} = req.body

//   const otpInt = parseInt(otp)
// const domain = req.hostname
  

//   console.log(otpInt, 'otp come')

//   try {
  
//     if(otpInt === req.session.otp){


//       const userData = new userschema({
//         name:req.session.name,
//         username:req.session.username,
//         email:req.session.email,
//         password:req.session.password,
//       })

  


//      const insertData = await userData.save()


//      if(insertData){
//       const profile = new profileSchema({
//         Id:insertData._id,
//         profilePic:`${domain}/public/default.jpg`,
//         name:insertData.name,
//         username:insertData.username
//         })


//         profile.save()

        

//         res.status(201).send({msg:'verified' , otpPage:false})
//         req.session.destroy()
//      }



//      console.log(insertData)


       
//     }else{
//       res.status(400).send({msg:'Otp not Match!'})
//     }


  
     
//   } catch (error) {
//     console.log(error)
//   }


// }




//Resend OTP
export const resendotp = async(req, res)=>{
  try {
    //checking undefiend headers
    if(req.headers.authorization === undefined){
      res.status(400).send({msg:'Need token'})
    }else{
    //split token
    let token
    const {authorization} = req.headers
    token = authorization.split(' ')[1]

    //generate random number
    const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    //store it in as a string form
    const otp = randomNumber.toString()
    //hasing the opt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(otp, salt);
   //find it using token
   userOtp.findOne({token:token}, (err, found)=>{
    if(err) return res.send({msg: 'err'})
    if(found){
      //if token matched
      if(found.token === token){
            //jwt resend token generate
      const resendtoken = jwt.sign({
      username : found.username
      }, process.env.JWT_SECRET , { expiresIn : "3min"});
        //update the user
        userOtp.findOneAndUpdate({token:token}, {$set:{otp:hash, token:resendtoken}}, (err, update)=>{
          if(err) return res.status(400).send({msg:'Error'})
          if(update){
            //send new otp using mail
            const mailOptions = {
              from: `chat app <${process.env.GMAIL}>`,
              to: `${found.email}`,
              subject: 'New OTP for your account',
             
            }
            //custom email template
            fs.readFile('./config/nodemailer-template/otp-template.html' , 'utf-8' , (err , data)=>{
            if (err) {
            console.error(err);
            return;
            }
            //dynamic code replace
            mailOptions.html = data.replace(/{OTP}/g, otp).replace(/{NAME}/g, found.name)
            //send mail
            nodemailerConfig.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
            });
      
            })
            res.status(201).send({msg:'A new OTP sent to your Email', resendTokn: resendtoken})
            
          }else{
            res.status(400).send({msg:'There was an error!'})
          }
        }) 
      }
    }else{
      res.status(409).send({msg: 'inauthentic user'})
    }
   })

    }  

  } catch (error) { 
    console.log(error)
  }

}



// //post request for login
// export const login = async(req , res) =>{
//   const domain = req.hostname
//   try {
//     const {username, email, password} = req.body

 
//   // const disable = await disableSchema.findOne({
//   //   username: username
//   // })



// const user = await userschema.findOne({
//   $or:[
//     {username:username},
//     {email:email}
//   ]
// })





// if(user){
//   const encPass = await bcrypt.compare(password, user.password)
//   if(encPass){

//   const disable = await disableSchema.findOne({
//     username: username
//   })

//   if(disable){

//     res.status(403).send({title:disable.Title, text: disable.Text})

//   }else{

//     const resendtoken = jwt.sign({
//     username : username
//     }, process.env.JWT_SECRET , { expiresIn : "1y"});

//     const profile = await profileSchema.findOne({Id:user._id})

//     const profilePic = profile ? profile.profilePic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

//     res.json({id:user._id, profile: profilePic, name: `${user.name}` ,username:user.username, email:user.email, token:resendtoken})

//   }






//   }else{
//     res.status(401).send({msg:'username or password incorrect'})
//   }

// }else{
//   console.log('faild')
//   res.status(401).send({msg:'username or password incorrect'})
// }



// //  if(disable){
// //   if(Object.keys(username && password ).length === 0){
// //     res.status(400).send({msg:'password should not be empty'})
// //   }else{
// //     res.status(403).send({title:disable.Title, text: disable.Text})
// //   }
  
// //  }else{
// //   userschema.findOne({$or:[{username:username},{email:email}]}, async (err, user) =>{
// //     if(err) return res.status(400).send(err)
// //     if(!user) return res.status(404).send({msg:'User not found'})
 
// //     //compare the entered password with database password
// //   bcrypt.compare(password, user.password ,async(err , result)=>{
// //       if(err) return res.status(400).send(err)
// //       if(!result) return res.status(400).json({ msg: "Username or Password Incorrect" }) 


// //    const profile = await profileSchema.findOne({Id:user._id})

// //    const resendtoken = jwt.sign({
// //     username : username
// //     }, process.env.JWT_SECRET , { expiresIn : "1y"});
   
// //     const profilePic = profile ? profile.profilePic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
// //       // req.session.user_id = user._id
// //       res.json({id:user._id, profile: profilePic, name: `${user.name}` ,username:user.username, email:user.email, token:resendtoken})
      
// //       // if(result) {
       
// //       //   res.status(201).send({'msg':'login success'})
// //       //   req.session.user_id = user._id
// //       //  console.log(req.session.user_id)
      
// //       // }else{
// //       //    res.status(401).send({'msg':'incorrect username or password'})
        

// //       // } 
      
// //     })

// //   // bcrypt.compare(password, user.password).then((isMatch)=>{
// //   //   if(!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
// //   //   req.session.user_id = user._id
// //   //   console.log(req.session.user_id)
// //   //   res.json({ msg: " Logged In Successfully" });
// //   // })




     
// //     })

// //  }



 

   
//   } catch (error) {
     
//     res.send(error)
//    }
// }



// // admin dashbord

// // export const adminDashboard = async(req, res)=>{
// //   try {
// //     const {email} = req.session.userInfo
// //     if ( req.session.user_id || req.session.user_id === email && req.session.otp.code ) {
// //       console.log(req.session.user_id)
// //       res.send('Welcome to the dashboard');
// //     } else {
// //       res.send('Please login to access the dashboard');
// //     }
// //   } catch (error) {
// //     console.log(error)
// //     res.send(error)
// //   }
// // }

// // export const logOut = (req ,res) =>{
// //    req.session.destroy((error)=>{
    
// //     res.clearCookie('login')
// //     res.send('logout successfull')
// //    });
// // }


 
// // export const ip = app.use((req, res, next) => {
  
// //     console.log(req.ip);
// //     next();
// //   });


export const getInfo = async(req, res)=>{
  const id = req.params.userId
   try {
    userschema.findById(id, (err , success)=>{
      if(err) return res.status(400).send({msg:'error'})
      if(success){
        res.status(200).send({msg:success.name})
      }
    })
   } catch (error) {
    
   }
}






// export const conversations = async(req, res)=>{
//   const newConversation = new conversationSchema({
//     members: [req.body.senderId, req.body.receiverId],
//   })
//   try {
//     const savedConversation = await newConversation.save();
//     res.status(200).json(savedConversation);
//   } catch (error) {
//     res.status(500).json(err);
//   }
// }



// export const getUser = async(req , res)=>{
//   const userId = req.params.userId;

// try {


// const conversation = await conversationSchema.find({
// conversationFor: userId
// })










// //   const conversation = await conversationSchema.find({

// //     // members: {$in:[userId]} 
// //     // members: { $elemMatch: { $eq: userId } }
// //     members: {$in:[userId]},
    
// //   }).sort({ date: -1 })


// //   console.log(conversation, 'conversation')

// let names =[];


// // for(const item of conversation) {
// //   console.log(item);

// //   const createdAt = moment(item.date);
// //   const now = moment();
// //   const duration = moment.duration(now.diff(createdAt));

// //   const years = duration.years();
// //   const months = duration.months();
// //   const days = duration.days();

// //   console.log(Math.abs(months));

// //   const date = moment(item.date);

// //   const getFormattedDate = (date) => {
// //     if (Math.abs(years)) {
// //       return `${date.format('MMM DD YYYY')}`;
// //     } else if (Math.abs(months)) {
// //       return `${date.format('MMM DD')}`;
// //     } else if (days) {
// //       return `${date.format('ddd')}`;
// //     } else {
// //       return date.format('hh:mm A');
// //     }
// //   };

// //   console.log(getFormattedDate(date));

// //   // const profile = await profileSchema.findOne({
// //   //   Id:item.members[1]
// //   // });
// //   // console.log(profile, 'come from profile');

// //   return {
// //     name: item.receiverName,
// //     Id: item.members[1],
// //     convText: item.text,
// //     date: getFormattedDate(date)
// //   };
// // };




// // res.status(200).send(results) 





// // conversation.map(async item =>{ 
// //   console.log(item)
  

// //   const createdAt = moment(item.date);
// //   const now = moment()
// //   const duration = moment.duration(now.diff(createdAt));


// //   const years = duration.years(); 
// //   const months = duration.months();
// //   const days = duration.days(); 



// //   console.log(Math.abs(months))

// //   const date = moment(item.date);
// //   const getFormattedDate = (date)=>{
// //     if( Math.abs(years) ){
// //       return `${date.format('MMM DD YYYY')}`
// //     }
// //     else if(Math.abs(months)){
// //       return `${date.format('MMM DD')} `
// //     }
// //     else if(days){         
// //       return `${date.format('ddd')}`
// //     }else {
// //       return date.format('hh:mm A')
// //     }

   
// // }

// // console.log(getFormattedDate(date))

// // // const profile = await profileSchema.findOne({
// // //   Id:item.members[1]
// // // })
// // // console.log(profile, 'come from profile')

// // names.push({ name: item.receiverName, Id: item.members[1], convText:item.text, date:getFormattedDate(date)})

// // console.log(names)
// // res.status(200).send(names);

 
// // })


// await Promise.all(conversation.map(async (item) => {
//   const createdAt = moment(item.date);
//   const now = moment();
//   const duration = moment.duration(now.diff(createdAt));

//   const years = duration.years();
//   const months = duration.months();
//   const days = duration.days();

//   const date = moment(item.date);
//   const getFormattedDate = (date) => {
//     if (Math.abs(years)) {
//       return `${date.format('MMM DD YYYY')}`;
//     } else if (Math.abs(months)) {
//       return `${date.format('MMM DD')}`;
//     } else if (days) {
//       return `${date.format('ddd')}`;
//     } else {
//       return date.format('hh:mm A');
//     }
//   };


//  let profiles

//  if(item.members[0]=== userId){
//   profiles = await profileSchema.findOne({
//     Id:item.members[1]
//   })

//  }

// if(item.members[1]=== userId){
//   profiles = await profileSchema.findOne({
//     Id:item.members[0]
//   })
// }

//  console.log(profiles)



// // console.log(profiles.profilePic, 'come from profile')

// const profilePic = profiles ? profiles.profilePic : '';
// // console.log(profiless)

//   names.push({
//     profile: profilePic,
//     name: item.receiverName,
//     Id: item.members[1],
//     convText: item.text,
//     date: getFormattedDate(date)
//   });



  




  
// }));

// console.log(names);
// res.status(200).send(names);


// // for(const item of conversation) {
// // // console.log(item)

// //   const createdAt = moment(item.date);
// //   const now = moment()
// //   const duration = moment.duration(now.diff(createdAt));


// //   const years = duration.years();
// //   const months = duration.months();
// //   const days = duration.days(); 



// //   console.log(Math.abs(months))

// //   const date = moment(item.date);
// //   const getFormattedDate = (date)=>{
// //     if( Math.abs(years) ){
// //       return `${date.format('MMM DD YYYY')}`
// //     }
// //     else if(Math.abs(months)){
// //       return `${date.format('MMM DD')} `
// //     }
// //     else if(days){         
// //       return `${date.format('ddd')}`
// //     }else {
// //       return date.format('hh:mm A')
// //     }

   
// // }

// // console.log(getFormattedDate(date))


// // // if(item.conversationFor === req.params.userId){
// // //   const profile = await profileSchema.findOne({
// // //   Id:item.members[1]
// // // })
// // //   names.push({profile:profile.profilePic, name:item.receiverName, Id: item.members[1],convText:item.text, date:getFormattedDate(date)});
// // // }else{
// // //       const profile = await profileSchema.findOne({
// // //         Id:item.members[0]
// // //       })
     
 
// // //       console.log(item.text)
// // //       names.push({profile:profile.profilePic, name:item.senderName, Id: item.members[0], convText:item.text, date:getFormattedDate(date)});

// // // }

// // // const profile = await profileSchema.findOne({
// // //   Id:userId
// // // })

// // // console.log(profile)



// //     if(item.members[0]=== req.params.userId ){

// // const profile = await profileSchema.findOne({
// //   Id:item.members[1]
// // })


      
// //       console.log(item.text)   
// //       names.push({profile:profile.profilePic, name:item.receiverName, Id: item.members[1],convText:item.text, date:getFormattedDate(date)});
// //     }else{
// //       const profile = await profileSchema.findOne({
// //         Id:item.members[0]
// //       })
     
 
// //       console.log(item.text)
// //       names.push({profile:profile.profilePic, name:item.senderName, Id: item.members[0], convText:item.text, date:getFormattedDate(date)});  
// //     }


// // console.log(names)

// //   }
//   // res.status(200).send(names);
  
// } catch (error) {
//   res.status(500).json(error);
// }



// }









//send msg
export const message = async(req, res)=> {
  const {senderId, receiverId, text} = req.body
  // console.log(req.body)

  const newMessage = new messageSchema({
    senderId,
    receiverId,
    text
  });  

  try {
    const profPic = await profileSchema.find({
      $or:[
        {Id:senderId},
        {Id:receiverId}
      ]
    })

   

    newMessage.save((err, success)=>{
      if(err) return res.status(400).send({msg:'error'})
      if(success){
        userschema.find(
          { 
            $or: [ 
              { _id: success.senderId },
              { _id: success.receiverId}
                 ] }
           , async(err, findUser)=>{
          if(err) return res.status(400).send({msg:'error'})
          if(findUser){

            console.log(findUser, 'come from finduser line 561')

          
        conversationSchema.find({ $or:[
          {members: {$all:[success.senderId, success.receiverId]}},
          {members: {$all:[success.receiverId, success.senderId]}}
          
        ] }, async(err, find)=>{
          if(err) return res.status(400).send({msg:'error'}) 
           console.log(find, 'come from ffind')
          if(find.length ){
            const originalText = success.text
            const trimText = originalText.slice(0, 10)
           await conversationSchema.findOneAndUpdate({
              $and:[
                {members: {$in:[success.senderId]}},
                {members: {$in:[success.receiverId]}}
                
              ]
            },{
              text: success.text,
              
            })
            
            res.status(200).json(success);           
            }

          else{  //
            const originalText = success.text
            const trimText = originalText.slice(0, 10)
            const conversation = new conversationSchema({
             
              senderName: '',
              receiverName:'',
              text:'',
              conversationFor:'',
              members:[success.senderId,success.receiverId]
             
            })

            const newconversation = new conversationSchema({
             
              senderName: '',
              receiverName:'',
              text:'',
              conversationFor:'',
              members:[success.receiverId, success.senderId],
          
            })


              

            if(findUser[0]._id.toString() === senderId ){
              console.log(success.text)
              conversation.senderName = findUser[0].name;
              conversation.receiverName = findUser[1].name; 
              conversation.text = success.text
              conversation.conversationFor = findUser[0]._id


              newconversation.senderName = findUser[1].name;
              newconversation.receiverName = findUser[0].name; 
              newconversation.text = success.text
              newconversation.conversationFor = findUser[1]._id
            }else{
              console.log(success.text)
              conversation.senderName = findUser[1].name;
              conversation.receiverName = findUser[0].name;
              conversation.text = success.text
              conversation.conversationFor = findUser[1]._id


              newconversation.senderName = findUser[0].name;
              newconversation.receiverName = findUser[1].name; 
              newconversation.text = success.text
              newconversation.conversationFor = findUser[0]._id

            }

            conversation.save()
            newconversation.save()
            res.status(200).json(success);
            console.log(success)

          }
        })







         
          }
        })

      }
    });
    
  } catch (err) {
    res.status(500).json(err)
  }


 








}

//end send msg



// conversation
export const getConversationId = async(req, res) =>{

  const { limit, offset } = req.query;
  
  try {
    const messages = await messageSchema.find({
      $or: [
        { senderId: req.params.Id, receiverId: req.params.Id2 },
        { senderId: req.params.Id2, receiverId: req.params.Id },
      ],

    }).sort({date:-1}).skip(parseInt(offset)).limit(limit);

    
 

   console.log(messages)


    let array= []

    for(const item of messages){

      const user = await userschema.findById(item.senderId)    
      const createdAt = moment(item.date);
      const now = moment()
      const duration = moment.duration(now.diff(createdAt));

      const years = duration.years();
      const months = duration.months();
      const days = duration.days();

      const date = moment(item.date);
      const getFormattedDate = (date)=>{
        if( Math.abs(years) ){
          return `${date.format('MMM DD YYYY')} AT ${date.format('hh:mm A')} `
        }
        else if(Math.abs(months)){
          return `${date.format('MMM DD')} AT ${date.format('hh:mm A')} `
        }
        else if(days){         
          return `${date.format('ddd')} AT ${date.format('hh:mm A')} `
        }else {
          return date.format('hh:mm A')
        }    
    }

      if(item.senderId === req.params.Id){
        console.log('sender,,,', item.text)
        const profPic = await profileSchema.findOne({
          $or:[
            {Id:req.params.Id},
           
          ]
        })



        array.push({messageId:item._id, profile:profPic.profilePic, iSend: item.senderId, name:user.name, text:item.text, Date:getFormattedDate(date)})
      }else if(item.senderId === req.params.Id2){

        const profPic = await profileSchema.findOne({
          $or:[
            {Id:req.params.Id2},
           
          ]
        })


        console.log('reciever,,,,', item.text) 
        array.push({messageId:item._id, profile:profPic.profilePic, whoSend: item.senderId, name:user.name, text:item.text, Date: getFormattedDate(date)})
      }
    }
    res.status(200).json(array.reverse());

console.log(array)
   




 



  } catch (err) {
    res.status(500).json(err);
  }
}

 




//profile
export const profile = async (req, res) =>{
  const domain = req.hostname
  const id = req.params.id

  try {
 const userProfile = await profileSchema.findOne({
  Id:id
 })

 const userEmail = await userschema.findOne({
  _id:id
 })

 


console.log(userProfile)

if(userProfile){
  res.status(201).send({id:userProfile.Id,profilePic:userProfile.profilePic, name:userProfile.name, username:userProfile.username, email:userEmail.email, domain:domain })
}



  } catch (error) {
    console.log(error)
  }
}


//profile picture update

export const profilePicUpdate = async (req, res) =>{
  const id = req.params.id
  const pic = req.body.profilePic
  try {
    
    const update = await profileSchema.findOneAndUpdate({
     Id:id
    },
    {
      $set:{
        profilePic:pic
      }
    },
    {
      new:true
    })

if(update){
  res.status(201).send({newPic:update.profilePic})
}



  } catch (error) {
    console.log(error)
  }
}


// update username

export const userName = async(req, res) =>{
  const id = req.params.id
  const usernames = req.body.username.toLowerCase()
  const usernameRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
  try {

    // const find = await userschema.findById({
    
    //    _id:id
      
      
    // })

    // const find2 = await profileSchema.findOne({
   
        
    //     Id :id
   
    // })

   const find = await userschema.findOne({

username:usernames
    
   
   })

  
// console.log(find)

  if(find){
      if(find._id.valueOf() === id){
        console.log('its your currenn username')
        res.status(409).send({msg:'its your current username'})
      }else{
        console.log('username exist')
        res.status(409).send({msg:'Usernames exist'})
      }
  }else{
 
    
      
    if(!usernameRegex.test(usernames)){
    res.status(401).send({msg:'incorrect format'})
    }else{
    if(Object.keys(usernames).length < 5 ){
      res.status(401).send({msg:'Usernames must be at least 5 characters long.'})
    }else{
      const username = await userschema.findOneAndUpdate({
        _id:id
      },
      {
        $set:{username:usernames}
      },
      {
        new:true
      }
      )
    
      const profileUsername = await profileSchema.findOneAndUpdate({
        Id:id
      },
      {
        $set:{ username: usernames}
      },
      {
        new:true
      }
      )
    
      res.status(201).send({msg:'username update successfully!', username:profileUsername.username})
      }
    }
    
    
    
    
  }



 
//   if(find){
//     if(find.username === usernames ){
    
//         res.status(409).send({msg:'username alreaady exist'})
   

     
//     }else{
// if(!usernameRegex.test(usernames)){
// res.status(401).send({msg:'incorrect format'})
// }else{
// if(Object.keys(usernames).length < 5 ){
//   res.status(401).send({msg:'Usernames must be at least 5 characters long.'})
// }else{
//   const username = await userschema.findOneAndUpdate({
//     _id:id
//   },
//   {
//     $set:{username:usernames}
//   },
//   {
//     new:true
//   }
//   )

//   const profileUsername = await profileSchema.findOneAndUpdate({
//     Id:id
//   },
//   {
//     $set:{ username: usernames}
//   },
//   {
//     new:true
//   }
//   )

//   res.status(201).send({msg:'username update successfully!', username:profileUsername.username})
//   }
// }


// }
//   }
  

  


  


  } catch (error) {
    console.log(error)
  }

}


//update name

export const Name = async(req, res) =>{
  const id = req.params.id
  const names = req.body.name
  const nameRegex =  /^[a-zA-Z\s]+$/;








  try {

    const find = await userschema.findOne({
     
        _id:id
      
      
    })

    const find2 = await profileSchema.findOne({
      
    
        Id: id
      
    })


    
    const createdAt = moment(find2.date);
    const now = moment()
    const duration = moment.duration(now.diff(createdAt));
    
  
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();

    console.log(months, 'months')
  

if(find){
  if(Object.keys(names).length < 3){
    res.status(401).send({msg:'names must be at least 3 characters long.'})
  }else{

    if(!nameRegex.test(names)){
      res.status(401).send({msg:'Invalid name'})
    }else{
      if(!months){
  
        res.status(401).send({msg:'Wait for one month to change the name again!'})
      }else{
      
        
            const username = await userschema.findOneAndUpdate({
              _id:id
            },
            {
              $set:{name:names , date: new Date()}
            },
            {
              new:true
            }
            )
          
            const profileUsername = await profileSchema.findOneAndUpdate({
              Id:id
            },
            {
              $set:{ name: names, date: new Date()}
            },
            {
              new:true
            }
            )
          
            res.status(201).send({msg:'name update successfully!', name:profileUsername.name})
            
        
      
      
      
      
      }
    }
  

  
  
  }
}
   



 




  







  


  } catch (error) {
    console.log(error)
  }

}


export const disable = async (req , res) =>{
 const {id, username , title, text} = req.body
  try {
    const {_id} = await userschema.findOne({
      username : username
    })
  
    const response = await disableSchema.findOne({
      $or:[
       { Id:_id},
       {username:username}
      ]
      
    })

    if(!response){
      const insert = new disableSchema({
        Id: _id,
        username: username,
        Title:title,
        Text:text
      })

      insert.save()
      
      if(insert){
        res.status(201).send({msg:'inserted'})
      }
    }

  } catch (error) {
    
  }


}


export const test = async (req, res) =>{
const domain = req.hostname

  const imageFile = req.file;
console.log(imageFile)


let url
if(imageFile !== undefined){
 url = `${imageFile.destination}/${imageFile.filename}`
}

if (imageFile === undefined){

  res.status(400).json({ msg: "File not selected" });
}else{




  const profileupdate = await profileSchema.findOneAndUpdate({Id:req.params.id}, {profilePic:url}, {new:true})

console.log(profileupdate, 'updated')


  res.status(201).json({ msg: "File uploaded successfully", url });
}





}


export const video = async (req, res) =>{
  const {videoId , userId , views} = req.body
  const {viewersId} = req.query
  const ipAddress = req.ip; // Get the user's IP address
  const userAgent = req.get('User-Agent'); // Get the user's device information

console.log(userAgent, 'user agent')

console.log(viewersId)

// if(viewersId === userId){

// }else{
//   let view = views
  
//   view++

//   console.log(view)
// }

let initial = 0
  try {



  const find = await videoCountSchema.findOne({
    userId
  })

  if(!find){


    const insert = new videoCountSchema({
      videoId,
      userId,
      views: initial
    })

    const data = await insert.save()
   
    console.log(data)




    console.log(find.views)


  }else{



    if(viewersId === userId){
      const update = await videoCountSchema.findOne({userId:userId})
      res.status(201).send(update)
    }else{
      const update = await videoCountSchema.findOneAndUpdate({userId}, { $inc: { views: 1 } }, {new:true})
  
      console.log(update, 'hh')

      res.status(201).send(update)
    }



  }


 

  } catch (error) {
    
  }

}



export const image = async(req, res) =>{
  try {
    const __dirname = path.resolve();
    
 
      // Load the pre-trained model
      const modelPath = path.join(__dirname, '..', 'server', 'classify', 'model.json');

      if (fs.existsSync(modelPath)) {
        console.log('Model file exists.');
      } else {
        console.log('Model file does not exist.');
      }
    
      const model = await tf.loadLayersModel(`file://${modelPath}`);
      console.log('Model loaded successfully.');
    
      const metadata = fs.readFileSync('../server/classify/metadata.json');
    
      // Preprocess the input image
      const imageBuffer = fs.readFileSync('../server/uploads/64a0533e786b227f16d8ea22/profile/64a0533e786b227f16d8ea22-1688231611756.jpg');
      const imageTensor = tf.node.decodeImage(imageBuffer);
      const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224]);
      const normalizedImage = resizedImage.div(tf.scalar(255));
      const input = normalizedImage.expandDims();
    
      // Perform prediction
      const prediction = model.predict(input) ;
    
      const output = prediction.dataSync();
    
    
    
    
        // Find the class ID with the highest probability
        const classId = output.indexOf(Math.max(...output));
    
      
    
    if(output[classId] >= 0.85){
      console.log('Predicted Class ID:', classId);
      const classname = JSON.parse(metadata).labels[classId]
    
        console.log('classname', JSON.parse(metadata).labels[classId])
    
        const probabilityScore = output[classId]
    const percentage = probabilityScore * 100;

    const predic = percentage.toFixed(2) + '% sure'
    
    console.log(percentage.toFixed(2) + '% sure');

    res.status(201).send({classname:classname, prediction:predic})

    }else{
      console.log('not sure')
    }
    
    
      console.log('Prediction Output:', output[classId]);
 
    
    


  } catch (error) {
    console.log(error)
  }
}