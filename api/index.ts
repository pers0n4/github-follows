import { OAuthApp, createNodeMiddleware } from "@octokit/oauth-app";

import type { Application } from "express";

const app = new OAuthApp({
  clientType: "oauth-app",
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  allowSignup: false,
  defaultScopes: ["user:follow"],
});

const express: Application = require("express")();

express.use(createNodeMiddleware(app));

export default express;
