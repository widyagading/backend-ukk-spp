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
    "SELECT siswa.*, kelas.nama_kelas, spp.nominal FROM siswa JOIN kelas ON siswa.id_kelas = kelas.id_kelas JOIN spp ON siswa.id_spp = spp.id_spp";

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

app.get("/:nama", (req, res) => {
  let data = {
    nama: req.params.nama,
  };
  const sql =
    "SELECT siswa.*, spp.nominal, kelas.nama_kelas FROM siswa JOIN spp ON siswa.id_spp = spp.id_spp JOIN kelas ON siswa.id_kelas = kelas.id_kelas WHERE ?";

  db.query(sql, data, (error, result) => {
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

app.post("/add", (req, res) => {
  let data = {
    nisn: req.body.nisn,
    nis: req.body.nis,
    nama: req.body.nama,
    id_kelas: req.body.id_kelas,
    alamat: req.body.alamat,
    no_telpon: req.body.no_telpon,
    id_spp: req.body.id_spp,
    username: req.body.username,
    password: req.body.password,
  };
  let message = "";
  let inserted = null;

  let sql = "INSERT INTO siswa set ?";
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

app.post("/update", (req, res) => {
  let data = [
    {
      nis: req.body.nis,
      nama: req.body.nama,
      id_kelas: req.body.id_kelas,
      alamat: req.body.alamat,
      no_telpon: req.body.no_telpon,
      id_spp: req.body.id_spp,
      username: req.body.username,
      password: req.body.password,
    },
    req.body.nisn,
  ];

  let message = "";
  let updated = null;

  let sql = "UPDATE siswa set ? WHERE nisn = ?";
  db.query(sql, data, (error, result) => {
    if (error) {
      updated = false;
      message = error.message;
    } else {
      if (result.affectedRows > 0) {
        updated = true;
        message = result.affectedRows + " row updated";
      } else {
        updated = false;
        message = "no data updated";
      }
    }
    let response = {
      updated: updated,
      message: message,
    };
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response));
  });
});

app.delete("/:nisn", (req, res) => {
  let data = {
    nisn: req.params.nisn,
  };
  let message = "";
  let deleted = null;

  let sql = "DELETE FROM siswa WHERE ?";
  db.query(sql, data, (error, result) => {
    if (error) {
      deleted = false;
      message = error.message;
    } else {
      deleted = true;
      message = result.affectedRows + " row deleted";
    }
    let response = {
      deleted: deleted,
      message: message,
    };
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response));
  });
});

module.exports = app;
