const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const headerToken = req.get("Authorization");
    if (!headerToken) return res.status(401).json({ message: "User not Authorized by ARMS" })

    let decodedToken;
    try {
        decodedToken = jwt.verify(headerToken, process.env.JWT_SECRET)
        if (decodedToken) {
            req.uid = decodedToken.uid
        } else {
            throw new Error("Unauthorized User")
        }
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: err })
    }
    next();
}