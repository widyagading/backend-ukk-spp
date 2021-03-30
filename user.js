const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../config");
// const md5 = require("md5");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "BelajarNodeJSItuMenyengankan";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// endpoint login user (authentication)
app.post("/login", (req, res) => {
  // tampung username dan password
  let param = [
    req.body.username, //username
    req.body.password, // password
  ];

  // create sql query
  let sql = "select * from petugas where username = ? and password = ?";

  // run query
  db.query(sql, param, (error, result) => {
    if (error) throw error;

    // cek jumlah data hasil query
    if (result.length > 0) {
      // user tersedia
      let payload = JSON.stringify(result[0].id_user);
      // generate token
      let token = jwt.sign(payload, SECRET_KEY); // generate token
      res.json({
        logged: true,
        data: result,
        token: token,
      });
    } else {
      // user tidak tersedia
      res.json({
        message: "Invalid username/password",
      });
    }
  });
});

module.exports = app;
