import express from "express";
import expressValidator from "express-validator";

// Create our express app
const app = express();

//  disable x-powered-by header
app.disable("x-powered-by");

// Middleware
app.use(express.json({ extended: false }));

// Exposes a bunch of methods for validating data. Used heavily on users.validateRegister
app.use(expressValidator());

export default app;
