const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../config.js");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/loginPetugas", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  const sql = "SELECT * FROM petugas WHERE username = ? AND password = ?";
  if (username && password) {
    db.query(sql, [username, password], (err, rows) => {
      if (err) throw err;
      else if (rows.length > 0) {
        res.json({
          message: "Login sukses!",
          data: {
            id_petugas: rows[0].id_petugas,
            level: rows[0].level,
            nama_petugas: rows[0].nama_petugas,
            username: rows[0].username,
          },
          logged: true,
        });
      } else {
        res.json({
          message: "Username / Password salah!",
          logged: false,
        });
      }
    });
  }
});

app.post("/loginSiswa", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  const sql =
    "SELECT siswa.*, kelas.nama_kelas, spp.nominal FROM siswa JOIN kelas ON siswa.id_kelas = kelas.id_kelas JOIN spp ON siswa.id_spp = spp.id_spp  WHERE username = ? AND password = ?";
  if (username && password) {
    db.query(sql, [username, password], (err, rows) => {
      if (err) throw err;
      else if (rows.length > 0) {
        res.json({
          message: "Login Siswa sukses!",
          data: {
            id_petugas: rows[0].id_petugas,
            nisn: rows[0].nisn,
            nis: rows[0].nis,
            nama: rows[0].nama,
            id_kelas: rows[0].id_kelas,
            id_spp: rows[0].id_spp,
            no_telpon: rows[0].no_telpon,
            username: rows[0].username,
            nama_kelas: rows[0].nama_kelas,
            spp: rows[0].nominal,
          },
          logged: true,
        });
      } else {
        res.json({
          message: "Username / Password salah!",
          logged: false,
        });
      }
    });
  }
});
module.exports = app;
