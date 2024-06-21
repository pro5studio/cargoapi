const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware tanımlamaları
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Statik dosyalar için public klasörü

// GET endpoint tanımlama
app.get("/proxy", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.yurticikargo.com/service/shipmentstracking",
      {
        params: {
          id: req.query.id,
          language: req.query.language || "tr",
        },
      }
    );
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Sunucuyu dinlemeye başla
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda başlatıldı`);
});

console.log(response.data);
