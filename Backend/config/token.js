import jwt from 'jsonwebtoken'

const genToken= async (userId)=>{
    try {
        const token= await jwt.sign({userId},process.env.JWT_SECRETE,{expiresIn:"7d"})
        return token;
    } catch (error) {
        console.log("gen Token Error")
    }
}
export default genToken;