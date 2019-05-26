import { AuthenticationError } from "apollo-server-express";
import { User } from "../models";
import { getUser } from "../helpers";

export const attemptSignIn = async (email, password) => {
  const message = "Incorrect email or password";
  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError(message);
  }

  if (!(await user.matchesPassword(password))) {
    throw new AuthenticationError(message);
  }

  return user;
};

const signedIn = req => {
  const token = req.headers.authorization;
  const userId = getUser(token);
  return userId;
};

export const ensureSignedIn = req => {
  if (!signedIn(req)) {
    throw new AuthenticationError("You must be signed in");
  }
};

export const ensureSignedOut = req => {
  console.log(req.headers);
  if (signedIn(req)) {
    throw new AuthenticationError("Already signed in");
  }
};

export const signOut = (req, res) =>
  // todo: How are we going to handle removing token from header

  new Promise((resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err);

      res.clearCookie(SESS_NAME);

      resolve(true);
    });
  });
