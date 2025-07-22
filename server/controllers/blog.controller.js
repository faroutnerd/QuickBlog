import fs from 'fs';

import { imagekit } from "../configs/imagekit.js";
import Blog from '../models/blog.model.js';
import Comment from '../models/comment.model.js';
import main from '../configs/gemini.js';


export const addBlog = async (req, res) => {
    try {

        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        // Check if all fields are present
        if(!title || !subTitle || !description || !category || !isPublished ) {
            return res.status(400).json({success: false, message: "Missing required fields"})
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        // Upload Image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs'
        });

        // Optimization through imagekit URL transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'},  // Auto compression
                {format: 'webp'},   // Convertt to modern format
                {width: '1280'}     // Width resizing
            ]
        });

        const image = optimizedImageUrl;

        await Blog.create({title, subTitle, description, category, image, isPublished});

        res.status(200).json({success:true, message: 'Blog added successfully'})

    } catch (error) {
        return res.status(500).json({success: false, message:error.message})
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({isPublished: true});
        res.status(200).json({success: true, blogs});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const getBlogById = async (req, res) => {
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId);
        if(!blog) {
            return res.status(400).json({success: false, message: 'Blog not found'});
        }
        res.status(200).json({success: true, blog});
    } catch (error) {
        return res.status(500).json({success: false, message:error.message})
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const {id} = req.body;
        await Blog.findByIdAndDelete(id);

        // Delet all comments associated with the blog
        await Comment.deleteMany({blog: id});

        res.status(200).json({success: true, message: 'Blog deleted successfully'});
    } catch (error) {
        return res.status(500).json({success: false, message:error.message})
    }
}

export const togglePublish = async (req, res) => {
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.status(200).json({success: true, message: 'Blog status updated'})
    } catch (error) {
        return res.status(500).json({success: false, message:error.message})
    }
}

// export const addComment = async (req, res) => {
//     try {
        
//         const {blog, name, content} = req.body;
//         await Comment.create({blog, name, content});
//         res.status(200).json({success: true, message: 'Comment added for review.'})

//     } catch (error) {
//         return res.status(500).json({success: false, message:error.message});
//     }
// }

export const addComment = async (req, res) => {
    try {
        
        const {blog, name, content} = req.body;

        const moderationPrompt = `
        Analyze the following comment and check if it contains offensive, abusive or inappropriate language:
        Comment: "${content}"
        Reply only with "approve" if it is clean, or "reject" if it contains bad language.
        `;

        const aiResponse = await main(moderationPrompt);
        const decision = aiResponse.toLocaleLowerCase().includes('reject') ? false : true;

        await Comment.create({
            blog, name, content, 
            isApproved: decision
        });

        res.status(200).json({
            success: true,
            message: decision
                ? "Comment added and approved."
                : "Comment added for review due to inappropriate content."
        });

    } catch (error) {
        return res.status(500).json({success: false, message:error.message});
    }
}

export const getBlogComments = async (req, res) => {
    try {
        
        const {blogId} = req.body;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
        res.status(200).json({success:true, comments})

    } catch (error) {
        return res.status(500).json({success: false, message:error.message});
    }
}

export const generateContent = async (req, res) => {
    try {
        const {prompt} = req.body;
        const content =  await main(prompt + ' Generate a blog content for this topic in simple text format');
        res.status(200).json({success: true, content})
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}