import express from "express"
import {signupController,Login} from  "../controllers/userController.js"
import bodyParser from "body-parser";
const router = express.Router();
router.use(bodyParser.json())
router.post('/register', signupController);
router.post('/login', Login);
export default router;