import Joi from "joi";

const email = Joi.string()
  .email()
  .required()
  .label("Email");

const password = Joi.string()
  .min(8)
  .max(30)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/)
  .label("Password")
  .options({
    language: {
      string: {
        regex: {
          base:
            "must have at least one lowercase letter, one uppercase letter, and one digit"
        }
      }
    }
  });

export const admission = Joi.object().keys({
  email,
  password
});
