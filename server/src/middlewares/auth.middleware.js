import AsyncHandler from '../utils/AsyncHandler.js'
import jwt from 'jsonwebtoken'
const verifyAdmin = AsyncHandler(
    async(req, res, next) => {
        const token = req.headers.authorization.split(" ")[1]

        if(!token) {
            throw new ApiError(401, "Unauthorized")
        }

        jwt.verify(token, process.env.JWT_SECRET)
        next()
    }
)

export default verifyAdmin