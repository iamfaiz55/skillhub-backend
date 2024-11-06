const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

exports.adminProtected = asyncHandler(async (req, res, next) => {
    const { admin } = req.cookies
    // console.log(admin);
    if (!admin) {
        return res.status(401).json({ message: "Non Cookie Found" })
    }
    jwt.verify(admin, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: err.message || "JWT ERROR" })
        }
        req.body.userId = decode.userId
        req.user = decode.userId
        next()
    })

})