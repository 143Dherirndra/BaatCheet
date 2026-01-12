import jwt from 'jsonwebtoken';

 export const isAuth=async(req,res,next)=>{
    try {
        let token = req.cookies.token;
        if(!token){
            return res.status(400).json({message:"token not found"})
        }
        const verifytoken= await jwt.verify(token,process.env.JWT_SECRETE)
         console.log(verifytoken) 
        req.userId= verifytoken.userId;
        next()
    } catch (error) {
        return res.status(400).json({message:`isAuth error ${error}`})
    }
}