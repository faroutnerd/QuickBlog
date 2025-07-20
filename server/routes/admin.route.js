import express from 'express';
import { adminLogin, approveCommentById, deletCommentById, getAllBlogsAdmin, getAllCommentsAdmin, getdashboard } from '../controllers/admin.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);
adminRouter.get('/comments', auth, getAllCommentsAdmin);
adminRouter.get('/blogs', auth, getAllBlogsAdmin);
adminRouter.post('/delete-comments', auth, deletCommentById);
adminRouter.post('/approve-comment', auth, approveCommentById);
adminRouter.get('/dashboard', auth, getdashboard);


export default adminRouter;