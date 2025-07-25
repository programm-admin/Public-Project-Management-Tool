verifyUserByToken = (req, res, next) => {
    // console.log("headers: ", JSON.stringify(req.headers));

    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ message: "No access because of missing token." });
    }

    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = decoded;
    //     next();
    // } catch (err) {
    //     res.status(401).json({ message: "Invalid token." });
    // }
    next();
};

module.exports = { verifyUserByToken };
