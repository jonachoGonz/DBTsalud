import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleGetContent,
  handleGetSiteSettings,
  handleListKeys,
  handleUpsertContent,
  handleUpsertSiteSettings,
} from "./routes/cms";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // CMS routes (proxy to Supabase to avoid browser CORS issues)
  app.get("/api/cms/content", handleGetContent);
  app.post("/api/cms/content", handleUpsertContent);
  app.get("/api/cms/keys", handleListKeys);
  app.get("/api/cms/settings", handleGetSiteSettings);
  app.post("/api/cms/settings", handleUpsertSiteSettings);

  return app;
}
