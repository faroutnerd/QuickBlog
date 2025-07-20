import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import connectDB from './configs/db.js';
import adminRouter from './routes/admin.route.js';
import blogRouter from './routes/blog.route.js';

const app = express();

await connectDB();

// Middlewares
app.use(cors());
app.use(express.json())

// Routes
app.get('/', (req, res) => { res.send('API running..')});
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Backend is running on port number ${PORT}`);
});

export default app;