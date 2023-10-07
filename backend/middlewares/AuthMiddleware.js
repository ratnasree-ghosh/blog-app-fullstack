const jwt = require("jsonwebtoken");

const isAuth = (req,res,next)=>{
    const token = req.headers["x-acciojob"];

    let verified;
    try{
        verified = jwt.verify(token, process.env.JWT_SECRET);

    }catch(err){
        return res.status(400).send({
            status: 400,
            message: "jwt not provided, Please Login!",
        })
    }

    // console.log(verified);

    if(verified){
        req.locals = verified;
        
         next();
        
        
    }else{
        res.status(401).send({
            status: 401,
            message: "User id not authenticated, Please Login!",
        })
    }
}

module.exports= {isAuth};