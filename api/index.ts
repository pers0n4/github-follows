import { OAuthApp, createNodeMiddleware } from "@octokit/oauth-app";
import * as express from "express";

const app = new OAuthApp({
  clientType: "oauth-app",
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  allowSignup: false,
  defaultScopes: ["user:follow"],
});

const server = express();

server.use(createNodeMiddleware(app));

export default server;
