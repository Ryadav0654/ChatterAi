import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    // console.log(req.cookies);
    const token = req.cookies.jwt;
    // console.log({token});
    if(!token) return response.status(401).send("You are not authenticated!");
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if(err) return response.status(403).send("Token is not valid!");
        req.userId = payload.userId;
        next();
    })
};
