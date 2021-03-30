const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config.js");
const app = express();
const port = 8080;

//Route
const auth = require("./route/auth");
const siswa = require("./route/siswa");
const kelas = require("./route/kelas");
const spp = require("./route/spp");
const petugas = require("./route/petugas");
const pembayaran = require("./route/pembayaran");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", auth);
app.use("/siswa", siswa);
app.use("/kelas", kelas);
app.use("/spp", spp);
app.use("/petugas", petugas);
app.use("/pembayaran", pembayaran);

app.get("/test", (req, res) => {
  let response = {
    message: "Ini end-point pertama ku",
    method: req.method,
    code: res.statusCode,
  };
  res.json(response);
});

app.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
