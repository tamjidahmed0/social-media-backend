import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import * as controller from '../controllers/appController.js'


// authenticate, (req, res)=>{res.setHeader('Content-Type', 'application/json');}, 

const router = Router();

//post req
router.route('/register').post(controller.register)
router.route('/otp').post(controller.otp)
router.route('/resendotp').post(controller.resendotp)
router.route('/login').post(authenticate, controller.login  ) 
// router.route('/admin').post( controller.adminDashboard)
// router.route('/logout').post(controller.logOut) 

 










export default router;
