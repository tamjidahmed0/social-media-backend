import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import * as controller from '../controllers/appController.js'

import  { loginController, registerController, conversationController } from "../controllers/index.js";
import multer from 'multer';
import {UploadImage} from "../middleware/index.js";

// const storage = multer.diskStorage({
//     destination: (req, file, cb) =>{

//         cb(null, 'uploads/')

//     },
//     filename:(req, file, cb) =>{
//         console.log(req.params.id, 'come from req')
//         const uniqueFileName = Date.now() + '-' + file.originalname;
//         cb(null, uniqueFileName);
//     }
// })

// const upload = multer({ storage:storage });

// authenticate, (req, res)=>{res.setHeader('Content-Type', 'application/json');}, 

const router = Router();

//post req
router.route('/register').post(registerController)
router.route('/otp').post(controller.otp)
router.route('/resendotp').post(controller.resendotp)
router.route('/login').post(loginController) 

router.route('/test/:id').post(UploadImage, controller.test ) 

router.route('/conversations/:userId').get(conversationController ) 

router.route('/message').post(controller.message ) 
router.route('/message/:Id/:Id2').get(controller.getConversationId) 
router.route('/getinfo/:userId').get(controller.getInfo) 
router.route('/profile/:id').get(controller.profile) 
router.route('/profilepicupdate/:id').put(controller.profilePicUpdate) 
router.route('/username/:id').put(controller.userName) 
router.route('/name/:id').put(controller.Name) 
router.route('/disable').post(controller.disable ) 

// router.route('/admin').post( controller.adminDashboard)
// router.route('/logout').post(controller.logOut) 

 

export default router;
