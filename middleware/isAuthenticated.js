import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) =>{
    try {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : req.cookies.token;

        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false,
            })
        }
        const decode =  jwt.verify(token, process.env.SECRET_KEY)
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false,
            })
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "User not authenticated",
            success: false,
        })
    }
}