export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  
  if (req.method === "OPTIONS") return res.status(200).end();

  const apiKey = req.query.key || "";
  const path = req.query.path || "";
  
  if (!apiKey || !path) {
    return res.status(400).json({ error: "Missing key or path" });
  }

  const HOST = "tennis-api-atp-wta-itf.p.rapidapi.com";
  const url = "https://" + HOST + "/tennis/v2/" + path;

  try {
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": HOST
      }
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
