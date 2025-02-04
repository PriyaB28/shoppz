import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    try {

        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized- Invalid token"
            })
        }
        req.userId = decoded.userId
        next()
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message:error.message
      })
    }
}

export default verifyToken