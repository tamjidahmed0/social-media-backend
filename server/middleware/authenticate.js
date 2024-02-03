import jwt  from 'jsonwebtoken'
import userschema from '../models/user.js'


 

const authenticate = async (req, res, next) => {

let token

const {authorization} = req.headers

if(authorization ){
  try {

    token = authorization.split(' ')[1]
    const result = jwt.verify(token, process.env.JWT_SECRET)

   

   

    // req.user = await userschema.findById(userID).select('-password')
    next()

  } catch (error) { 
    res.status(401).send({'status': 'invalid token'})
  }
 
}else{
  res.status(401).send({'status': 'please token provid'})
}



  };







export default authenticate;