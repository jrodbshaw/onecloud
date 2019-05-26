import mongoose from "mongoose";
import Joi from "joi";
import { UserInputError } from "apollo-server-express";
import { admission } from "../schemas";
import { attemptSignIn, signOut } from "../controllers/authController";
import { getUser, createUserTokenObject } from "../helpers";
import { User } from "../models";

export default {
  Query: {
    me: (_, args, { req }, info) => {
      const currUserId = getUser(req.headers.authorization);
      return User.findById(currUserId);
    },
    users: (_, args, { req }, info) => {
      return User.find({});
    },

    user: (_, args, { req }, info) => {
      if (!mongoose.Types.ObjectId.isValid(args.id)) {
        throw new UserInputError(`${args.id} is not a valid user ID`);
      }
      return User.findById(args.id);
    }
  },
  Mutation: {
    signUp: async (_, args, { req }, info) => {
      await Joi.validate(args, admission, { abortEarly: false });

      const user = await User.create(args);

      return user;
    },
    signIn: async (_, args, { req }, info) => {
      await Joi.validate(args, admission, { abortEarly: false });

      const user = await attemptSignIn(args.email, args.password);
      const secureUser = createUserTokenObject(user);

      return secureUser;
    },
    signOut: (_, args, context, info) => {
      // todo: This needs to be looked at, context is returning a {user}
      return signOut(req, res);
    }
  }
};
