var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const con = require('../sql/connect');

/* GET users listing. */
router.post('/', function(req, res, next) {
  bcrypt.hash(req.body.password, 10, (err, hashed_pw) => {
    if(err) throw err;
    con.query(`INSERT INTO users (displayname, email, password) VALUES(${con.escape(req.body.displayName)},${con.escape(req.body.email)}, ${con.escape(hashed_pw)})`, (err, status) => {
        if (err) {
          res.json(false);
          throw err;
        } 
        res.json(true);
        res.end();
      });
  });
});

module.exports = router;
