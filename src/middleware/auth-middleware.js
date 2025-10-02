import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(403)
      .json({ message: "you dont have a perrmission for this operation" });
  } else {
    const [, token] = authorization.trim().split(" ");
    jwt.verify(token, process.env.JWT_SECRET || "", (err) => {
      if (err) {
        console.log(err);
      } else {
        next();
      }
    });
  }
};

export default authMiddleware;
