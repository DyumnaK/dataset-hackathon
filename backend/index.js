const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
  })
});

const DATA_FILE = path.join(__dirname, "data", "worksheets.json");

function readWorksheets() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8") || "[]");
}
function writeWorksheets(list) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));
}

// teacher: create worksheet
app.post("/api/worksheets", upload.array("images[]"), (req, res) => {
  const title = req.body.title || "Untitled";
  const labels = Array.isArray(req.body["labels[]"])
    ? req.body["labels[]"]
    : [req.body["labels[]"]];

  const items = (req.files || []).map((file, idx) => ({
    id: "item" + idx,
    label: labels[idx],
    imageUrl: "http://localhost:5000/uploads/" + file.filename
  }));

  const worksheets = readWorksheets();
  const worksheet = {
    id: "ws" + Date.now(),
    title,
    createdAt: new Date().toISOString(),
    items
  };
  worksheets.push(worksheet);
  writeWorksheets(worksheets);
  res.json(worksheet);
});

// student: latest worksheet
app.get("/api/worksheets/latest", (req, res) => {
  const worksheets = readWorksheets();
  if (!worksheets.length) return res.json(null);
  res.json(worksheets[worksheets.length - 1]);
});

const PORT = 5000;
app.listen(PORT, () => console.log("API on http://localhost:" + PORT));
