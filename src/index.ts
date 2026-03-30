import express, { Request, Response } from "express";
import https from "https";

const app = express();

app.use((req: Request, res: Response, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.options("/api/tennis", (req: Request, res: Response) => {
  res.status(200).end();
});

app.get("/api/tennis", (req: Request, res: Response) => {
  const key = (req.query.key as string) || "";
  const path = (req.query.path as string) || "";

  if (!key || !path) {
    res.status(400).json({ error: "Missing key or path" });
    return;
  }

  const options = {
    hostname: "tennis-api-atp-wta-itf.p.rapidapi.com",
    path: "/tennis/v2/" + path,
    method: "GET",
    headers: {
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host": "tennis-api-atp-wta-itf.p.rapidapi.com",
    },
  };

  const request = https.request(options, (response) => {
    let data = "";
    response.on("data", (chunk) => { data += chunk; });
    response.on("end", () => {
      try {
        res.status(200).json(JSON.parse(data));
      } catch (e) {
        res.status(500).json({ error: "Parse error", raw: data.slice(0, 200) });
      }
    });
  });

  request.on("error", (e) => {
    res.status(500).json({ error: e.message });
  });

  request.end();
});

export default app;
