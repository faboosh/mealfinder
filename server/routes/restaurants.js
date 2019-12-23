const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const con = mysql.createConnection({
    socketPath: '/home/fabianjohansson/.config/Local/run/cEh6oMlMn/mysqld.sock',
    user: 'root',
    password: 'root',
    database: 'restaurants',
    debug: false,
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

/* GET home page. */
router.get('/', function (req, res, next) {
    con.query('SELECT * FROM restaurants ORDER BY avgrating DESC', (err, rows) => {
        if (err) throw err;
        console.log(rows);
        res.json(rows);
    });
});

router.get('/:query', function (req, res, next) {
    res.json([{
        id: 1,
        name: req.params.query,
        avgRating: 4,
        category: 'Fast food',
        description: 'Best burgers in Bikini Bottom',
        price: 1
    },
    {
        id: 2,
        name: req.params.query,
        avgRating: 5,
        category: 'Grill',
        description: 'Perfect atmosphere for a night out.',
        price: 2
    }]);
});

module.exports = router;
