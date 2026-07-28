import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing middleware
  app.use(express.json());

  // 1. Consolidated Canonical Redirection Middleware
  // Enforces non-www HTTPS (gomoroccoai.com), /index.html -> /, and trailing slash normalization in 1 hop
  app.use((req, res, next) => {
    const rawHost = req.headers.host || "";
    const proto = (req.headers["x-forwarded-proto"] as string) || req.protocol;

    const isWww = rawHost.startsWith("www.gomoroccoai.com");
    const isLocalOrContainer = rawHost.includes("localhost") || rawHost.includes("127.0.0.1") || rawHost.includes("run.app");

    let targetHost = rawHost;
    if (isWww) {
      targetHost = rawHost.replace(/^www\./, "");
    }

    let targetProto = proto;
    if (targetHost === "gomoroccoai.com" && proto === "http") {
      targetProto = "https";
    }

    let targetPath = req.path;
    if (targetPath === "/index.html") {
      targetPath = "/";
    } else if (targetPath.length > 1 && targetPath.endsWith("/")) {
      targetPath = targetPath.slice(0, -1);
    }

    const queryIndex = req.url.indexOf("?");
    const queryString = queryIndex !== -1 ? req.url.substring(queryIndex) : "";

    const isWwwRedirect = isWww;
    const isHttpRedirect = (targetHost === "gomoroccoai.com" && proto === "http");
    const isPathRedirect = targetPath !== req.path;

    if (!isLocalOrContainer && (isWwwRedirect || isHttpRedirect || isPathRedirect)) {
      const destination = `${targetProto}://${targetHost}${targetPath}${queryString}`;
      return res.redirect(301, destination);
    }

    next();
  });

  // Hot Module Replacement/Middleware setup with Vite
  if (process.env.NODE_ENV !== "production") {
    // Support clean/pretty URLs in development mode by rewriting them to .html before passing to Vite
    app.use((req, res, next) => {
      if (!req.path.includes(".") && !req.path.endsWith("/")) {
        req.url = `${req.path}.html${req.url.substring(req.path.length)}`;
      }
      next();
    });

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));

    // Support clean/pretty URLs by trying to append .html if requested without extension
    app.get("*", (req, res, next) => {
      if (req.path.endsWith("/") || req.path.includes(".")) {
        return next();
      }
      const cleanPath = path.join(distPath, `${req.path}.html`);
      res.sendFile(cleanPath, (err) => {
        if (err) {
          next();
        }
      });
    });

    // Fallback to 404.html if route not found
    app.get("*", (req, res) => {
      res.status(404).sendFile(path.join(distPath, "404.html"), (err) => {
        if (err) {
          res.status(404).sendFile(path.join(distPath, "index.html"));
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Morocco Server] running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to bootstrap server:", err);
});
