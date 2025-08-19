# 📝 Quickblog

A modern, full-stack AI-integrated blogging platform built with **React.js**, **Tailwind CSS**, **Node.js**, and **MongoDB**.

## 🔗 Live Demo
[Click here to visit the live site 🚀](https://quick-blog-beta-woad.vercel.app/)

[![Full Stack Blog App Website](https://github.com/user-attachments/assets/2bae6a02-7912-4597-9660-cc3bfc0829db)](https://quick-blog-beta-woad.vercel.app/)


## 🚀 Features

- ✨ Create and publish blogs with the help of **AI**
- 🧠 AI-powered comment moderation to flag inappropriate content
- 📂 Blog image storage and delivery via **ImageKit.io**
- 🔍 Search and filter blogs by category
- 🧵 Clean and minimalistic UI built with **Tailwind CSS**
- 🗃️ Backend powered by **Node.js** and **MongoDB**

## 💡 Tech Stack

**Frontend:**
- React.js
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)

**Other Integrations:**
- Gemini AI / AI integration for blog generation & moderation
- ImageKit.io for image storage and CDN

## 🧠 AI Functionality

- **Blog Creation**: Users can generate content using AI assistance.
- **Comment Moderation**: AI checks comments for inappropriate terms; if found, the comment is marked as **unapproved**.

## 🖼️ Media Handling

- All uploaded images are stored and optimized using [ImageKit.io](https://imagekit.io)

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/quickblog.git
cd quickblog
```

Frontend
```bash
cd client
npm install
```

Backend
```bash
cd server
npm install
```

Environment Variables
```bash
PORT=your_port_number
MONGODB_URI=your_mongo_connection_string
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_path
GEMINI_API_KEY=your_openai_api_key
```

# Run the project

Start Backend
```bash
cd server
npm run server
```

Start Frontend
```bash
cd client
npm run dev
```
