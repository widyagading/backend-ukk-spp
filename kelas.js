const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../config.js");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const sql = "SELECT * FROM kelas";

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

app.post("/add", (req, res) => {
  let data = {
    id_kelas: req.body.id_kelas,
    nama_kelas: req.body.nama_kelas,
    kompetensi_keahlian: req.body.kompetensi_keahlian,
  };
  let message = "";
  let inserted = null;

  let sql = "INSERT INTO kelas set ?";
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
      nama_kelas: req.body.nama_kelas,
      kompetensi_keahlian: req.body.kompetensi_keahlian,
    },
    req.body.id_kelas,
  ];

  let message = "";
  let updated = null;

  let sql = "UPDATE kelas set ? WHERE id_kelas = ?";
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
app.delete("/:id_kelas", (req, res) => {
  let data = {
    id_kelas: req.params.id_kelas,
  };
  let message = "";
  let deleted = null;

  let sql = "DELETE FROM kelas WHERE ?";
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
