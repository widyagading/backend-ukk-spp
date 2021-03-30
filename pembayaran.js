const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../config.js");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const sql =
    "SELECT pembayaran.*, spp.nominal, siswa.nama, petugas.nama_petugas FROM pembayaran JOIN petugas ON pembayaran.id_petugas = petugas.id_petugas JOIN spp ON pembayaran.id_spp = spp.id_spp JOIN siswa ON pembayaran.nisn = siswa.nisn ORDER BY pembayaran.tgl_bayar";

  db.query(sql, (error, result) => {
    let response = null;
    if (error) {
      response = {
        message: error.message,
      };
    } else {
      response = {
        count: result.length,
        data: result,
      };
    }
    res.json(response);
  });
});

app.get("/siswa", (req, res) => {
  let nisn = req.query.nisn;
  const sql =
    "SELECT pembayaran.*, spp.nominal, siswa.nama, petugas.nama_petugas FROM pembayaran JOIN petugas ON pembayaran.id_petugas = petugas.id_petugas JOIN spp ON pembayaran.id_spp = spp.id_spp JOIN siswa ON pembayaran.nisn = siswa.nisn WHERE pembayaran.nisn = ?";

  db.query(sql, nisn, (error, result) => {
    let response = null;
    if (error) {
      response = {
        message: error.message,
      };
    } else {
      response = {
        count: result.length,
        data: result,
      };
    }
    res.json(response);
  });
});

app.post("/entri", (req, res) => {
  let data = {
    id_petugas: req.body.id_petugas,
    nisn: req.body.nisn,
    tgl_bayar: req.body.tgl_bayar,
    bulan_dibayar: req.body.bulan_dibayar,
    tahun_dibayar: req.body.tahun_dibayar,
    id_spp: req.body.id_spp,
    jumlah_bayar: req.body.jumlah_bayar,
  };
  let message = "";
  let inserted = null;

  let sql = "INSERT INTO pembayaran set ?";
  db.query(sql, data, (err, result) => {
    if (err) {
      message = err.message;
      inserted = false;
    } else {
      message = result.affectedRows + " row inserted";
      inserted = true;
    }
    let response = {
      message: message,
      inserted: inserted,
    };
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response));
  });
});

module.exports = app;
