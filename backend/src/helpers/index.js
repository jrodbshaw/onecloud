import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

export const getUser = token => {
  if (token) {
    const id_token = token.replace("Bearer ", "");
    const decoded = jwt.verify(id_token, JWT_SECRET);
    const userId = decoded.id;
    return `${userId}`;
  }
};

export const createUserTokenObject = user => {
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "30d"
  }); // Expires in 30 days...
  return {
    token,
    user
  };
};
