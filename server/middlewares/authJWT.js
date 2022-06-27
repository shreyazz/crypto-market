const jwt = require("jsonwebtoken");

const authJWT = async (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = req.headers("x-auth-token");
  const user = jwt.verify(token, JWT_SECRET);
  try {
    const isUserVerified = user.isVerified;
    isUserVerified
      ? next()
      : res
          .status(403)
          .json({
            message: "something is wrong, you are not allowed on this route.",
          });
  } catch (error) {
    next(error);
  }
};
