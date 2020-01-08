const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/middleware');
const con = require('../sql/connect');

/* GET home page. */
router.get('/',authMiddleware, function(req, res) {
    res.json(req.verifiedUser);
});

router.get('/logout', function(req, res) {
    console.log(req.cookies['authentication']);
    res.status(200);
});

router.get('/:query', (req, res) => {
    con.query('SELECT * FROM users WHERE email = ?', [req.params.query], (err, rows) => {
        if (err) throw err;
        let users = rows;
        let valid = users.length == 0;
        res.json(valid);
    })
})

module.exports = router;
