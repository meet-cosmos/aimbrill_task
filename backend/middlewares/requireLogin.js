const jwt = require("jsonwebtoken");
const secret = "CRUDAPI";

module.exports = (req, res, next)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, secret, (err, decode)=>{
            if(err){
                return res.status(403).json({
                    error : "Unauthorized user"
                })
            }
            console.log(decode);
            req.user = decode.data;
            next();
        })
    }else{
        return res.status(403).json({
            error : "User is not authenticated"
        })
    }
}