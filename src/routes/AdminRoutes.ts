import express, { Router } from 'express';
import { registerUserAdmin, userAdminLogin, userVerify } from '../controllers/AdminController';
import auth from '../middleware/AuthAdmin';

const adminRouter: Router = express.Router();


adminRouter.post('/register-user', registerUserAdmin);  // http://localhost:8000/api/users-admin/register-user
adminRouter.post('/login', userAdminLogin);             // http://localhost:8000/api/users-admin/login
adminRouter.get('/verify', auth, userVerify);           // http://localhost:8000/api/users-admin/verify

export default adminRouter;
