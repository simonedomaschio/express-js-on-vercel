module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") return res.status(200).end();

  const key = req.query.key || "";
  const path = req.query.path || "";
  if (!key || !path) return res.status(400).json({ error: "Missing key or path" });

  const HOST = "tennis-api-atp-wta-itf.p.rapidapi.com";
  const url = "https://" + HOST + "/tennis/v2/" + path;

  try {
    const r = await fetch(url, {
      headers: { "X-RapidAPI-Key": key, "X-RapidAPI-Host": HOST }
    });
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
