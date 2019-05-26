import { ApolloServer } from "apollo-server-express";
import connectDB from "../config/db";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import app from "./app";
import schemaDirectives from "./directives";
// Import env variables from .env
require("dotenv").config({ path: ".env" });
const { APP_PORT, NODE_ENV } = process.env;

const IN_PROD = NODE_ENV === "production";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context: ({ req, res }) => ({ req, res }),
  playground: IN_PROD
    ? false
    : {
        settings: {
          "request.credentials": "include"
        }
      }
});

server.applyMiddleware({ app });

// Connect to the database and handle bad connections
connectDB();

app.listen({ port: APP_PORT }, () => {
  console.log(
    `OK, 3, 2, 1, LET'S JAM! → http://localhost:${APP_PORT}${
      server.graphqlPath
    }`
  );
});
