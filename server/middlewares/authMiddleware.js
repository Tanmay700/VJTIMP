const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log("start auth");
    try {
        // Get token
        const authorizationHeader = req.header('authorization');
        const token = authorizationHeader.split(" ")[1];

        // Verify token
        const decryptedToken = jwt.verify(token, process.env.jwt_secret);

        // Set userId on the request object
        req.userId = decryptedToken.userId;
        console.log("auth");

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
};
