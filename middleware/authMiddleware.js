const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("Auth Header:", authHeader);

    // ✅ Check header format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Invalid token format (Bearer missing)"
        });
    }

    // ✅ Extract token
    const token = authHeader.split(" ")[1];

    console.log("Extracted Token:", token);
    console.log("JWT SECRET:", process.env.JWT_SECRET);

    if (!token) {
        return res.status(401).json({
            message: "Token not found after Bearer"
        });
    }

    try {
        // ✅ Verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded Token:", decodedToken);

        // Attach user info to request
        req.user = decodedToken;

        next();

    } catch (error) {
        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            message: error.message   // 🔥 shows exact issue
        });
    }
};

module.exports = authMiddleware;