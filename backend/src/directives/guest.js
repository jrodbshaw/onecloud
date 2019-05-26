import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver } from "graphql";
import { ensureSignedOut } from "../controllers/authController";

export default class GuestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = function(...args) {
      const [, , context] = args;

      ensureSignedOut(context.req);

      return resolve.apply(this, args);
    };
  }
}
