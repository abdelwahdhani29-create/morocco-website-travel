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

  // Hot Module Replacement/Middleware setup with Vite
  if (process.env.NODE_ENV !== "production") {
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
