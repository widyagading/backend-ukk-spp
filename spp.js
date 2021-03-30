const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../config.js");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const sql = "SELECT * FROM spp";

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
    id_spp: req.body.id_spp,
    tahun: req.body.tahun,
    nominal: req.body.nominal,
  };
  let message = "";
  let inserted = null;

  let sql = "INSERT INTO spp set ?";
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
      tahun: req.body.tahun,
      nominal: req.body.nominal,
    },
    req.body.id_spp,
  ];

  let message = "";
  let updated = null;

  let sql = "UPDATE spp set ? WHERE id_spp = ?";
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

app.delete("/:id_spp", (req, res) => {
  let data = {
    id_spp: req.params.id_spp,
  };
  let message = "";
  let deleted = null;

  let sql = "DELETE FROM spp WHERE ?";
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
