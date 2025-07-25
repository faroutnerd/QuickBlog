import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
    const token = req.headers.authorization;

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(500).json({success: false, message: 'Invalid token'})
    }
}