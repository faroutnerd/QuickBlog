import jwt from 'jsonwebtoken';
import Blog from '../models/blog.model.js';
import Comment from '../models/comment.model.js';

export const adminLogin = async (req, res) => {
    try {
        const {email, password}  = req.body;
        
        if(email !== process.env.ADMIN_LOGIN || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({success: false, message: 'Invalid Credentials'})
        }

        const token = jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: '24h'})

        return res.json({success: true, token})


    } catch (error) {
        return res.status(500).json({success: false, message:error.message});
    }
}

export const getAllBlogsAdmin = async (req, res) => {
    try {
        
        const blogs = await Blog.find({}).sort({createdAt: -1});
        res.json({success: true, blogs});

    } catch (error) {
        return res.status(500).json({success: false, message:error.message});
    }
}

export const getAllCommentsAdmin = async (req, res) => {
    try {
        
        const comments = await Comment.find({}).populate('blog').sort({createdAt:-1})
        res.status(200).json({success: true, comments})

    } catch (error) {
        return res.status(500).json({success: false, message:error.message});
    }
}

export const getdashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished: false});

        const dashboardData = {
            blogs, comments, drafts, recentBlogs
        }
        res.json({success: true, dashboardData});

    } catch (error) {
        return res.status(500).json({success: false, message:error.message});
    }
}

export const deletCommentById = async (req, res) => {
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Comment deleted successfully'});
    } catch (error) {
        return res.status(500).json({success: false, message:error.message});
    }
}

export const approveCommentById = async (req, res) => {
    try {
        
        const {id} = req.body;
        await Comment.findByIdAndUpdate(id, {isApproved: true});
        res.status(200).json({success: true, message: 'Comment approved successfully'});

    } catch (error) {
        return res.status(500).json({success: false, message:error.message});
    }
}