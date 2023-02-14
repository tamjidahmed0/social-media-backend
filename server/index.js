import express  from "express"
//import Db 
import connectDB from "./config/db.js"
//import router
import  router  from './router/routes.js'
//import dotenv
import * as dotenv from 'dotenv' 
dotenv.config()
//import session
import session from "express-session";
//import cors
import cors from 'cors'
//import bodyparser
import bodyParser from "body-parser"
//import cookie parser
import cookieParser from "cookie-parser"
import  IpFilter  from "express-ipfilter"
//env for secret credentials
const port = process.env.PORT || 8000

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });



//use session for security
app.use(session({
    key: 'login', 
    secret: process.env.SESSION_SECRET ,
    resave: false,
    saveUninitialized: true,
    cookie:{secure:true, maxAge: 15*60*1000}
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//use cors
app.use(cors())


// app.use((req, res, next) => {
//     console.log(req.ip)
//     next()
//   })
  




// app.use((req, res, next) => {
//     if (req.cookies.user_id && !req.session.user_id) {
//       res.clearCookie("login");
//     }
//     next();
//   });

//json formate
app.use(express.json())

//disable x-powered-by;
app.disable('x-powered-by');

//api routes
app.use('/api', router )



//start express app
connectDB().then(()=>{
   app.listen(port, ()=>{
    console.log(`mongodb connected and server connected to port ${port}`)
   })
}).catch((error)=>{
    console.log('invalid port',error)
})
