const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    try{
        let token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = verify
        next()
    } catch(err){
        return res.status(401).json({
            message: 'Auth Failed'
        })
    }
}