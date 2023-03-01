import jwt  from 'jsonwebtoken'
import userschema from '../models/user.js'


 

const authenticate = async (req, res, next) => {

let token

const {authorization} = req.headers

if(authorization ){
  try {

    token = authorization.split(' ')[1]
    const {userID} = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await userschema.findById(userID).select('-password')
    next()

  } catch (error) {
    res.status(401).send({'status': 'invalid token'})
  }

}else{
  res.status(401).send({'status': 'please token provid'})
}


// try {
//   if (req.session.useris) {
//     console.log(req.session.useris)
//     next();
//   } else {
//     res.send('')
//   }


// } catch (error) {
//   console.log(error)
// }







  };







export default authenticate;