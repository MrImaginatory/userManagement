import jwt from 'jsonwebtoken'

// Suggested code may be subject to a license. Learn more: ~LicenseLog:2217859132.
const verifyJwt = async (req,res,next) => {
    const token = req.cookies.jwtToken;

    if(!token){
        return res.status(401).json({message:"Unauthorized User,Token Missing"});
    }
    try{
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized User,Invalid Token"});
    }
}