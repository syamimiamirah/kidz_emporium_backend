const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    //if(token == null) return res.sendStatus(401);
    if(!token){
        return res.status(403).send({message: "No Token Provided"});
    }

    jwt.verify(token, "Snippet_SecretKey", (err, user)=> {
        if(err) return res.sendStatus(401).send;({message: "Unauthorized!"});
        req.user = user.data;
        next();
    });

}

function generateAccessToken(UserModel){
    return jwt.sign({data: UserModel}, "Snippet_SecretKey", {
        expiresIn: "1h"
    });
}

module.exports = {
    authenticateToken,
    generateAccessToken,
};