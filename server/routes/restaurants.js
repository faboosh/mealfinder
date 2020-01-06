const express = require('express');
const router = express.Router();
const con = require('../sql/connect');

let debug = false;

con.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

//GET top 10 restaurants
router.get('/', function (req, res, next) {
    con.query(`SELECT 
        res.id, res.name, res.category, ROUND(AVG(rev.price)) as price, ROUND(AVG(rev.rating)) as avgrating
        FROM restaurants res
        LEFT JOIN reviews rev ON
        res.id = rev.restaurant_id
        GROUP BY res.id
        ORDER BY avgrating DESC LIMIT 10`, 
    (err, rows) => {
        if (err) throw err;
        if(debug) console.log(rows);
        res.json(rows);
    });
});

//Searches restaurants and categories of restaurants
router.get('/search/:query', function (req, res, next) {
    if (req.params.query != '') {
        con.query(`SELECT 
        res.id, res.name, res.category, ROUND(AVG(rev.price)) as price, ROUND(AVG(rev.rating)) as avgrating
        FROM restaurants res
        LEFT JOIN reviews rev ON
        res.id = rev.restaurant_id
        WHERE LOWER(res.name) REGEXP ${con.escape(req.params.query)}
        OR LOWER(res.category) REGEXP ${con.escape(req.params.query)}
        GROUP BY res.id ORDER BY avgrating DESC`, (err, rows) => {
            if (err) throw err;
            if(debug) console.log(rows);
            res.json(rows);
        })
    } else {
        res.json();
    }
});

//Gets all restaurants owned by specified user
router.get('/owner/:id', function (req, res, next) {
    if (req.params.query != '') {
        con.query(`SELECT 
        res.id, res.name, res.category, ROUND(AVG(rev.price)) as price, ROUND(AVG(rev.rating)) as avgrating
        FROM restaurants res
        LEFT JOIN reviews rev ON
        res.id = rev.restaurant_id
        WHERE owner = ?
        GROUP BY res.id ORDER BY avgrating DESC`,[req.params.id], (err, rows) => {
            if (err) throw err;
            if(debug) console.log(rows);
            res.json(rows);
        })
    } else {
        res.json();
    }
});

//Gets all categories of users
router.get('/categories', function (req, res, next) {
    con.query('SELECT DISTINCT category FROM restaurants', (err, rows) => {
        if (err) throw err;
        console.log(rows);

        res.json(rows);
    });
});

//Deletes restaurant based on ID
router.delete('/:id', function (req, res, next) {
    con.query(`DELETE FROM restaurants WHERE id = ?`, [req.params.id], (err, rows) => {
        if (err) throw err;
        if(debug) console.log(rows);
        res.json(rows);
    })
});

//Inserts restaurant into DB and returns inserted restaurant to client
router.post('/', (req, res) => {
    con.query(`INSERT INTO restaurants (name, category, description, owner) VALUES (${con.escape(req.body.name)},${con.escape(req.body.category)},${con.escape(req.body.description)}, ${con.escape(req.body.owner)})`,
        (err, rows) => {
            if (err) throw err;
            if(debug) console.log(rows);
            con.query(`SELECT * FROM restaurants WHERE id = ?`, [rows.insertId], (err, rows) => {
                if (err) throw err;
                res.json(rows[0]);
            })
        })
})

//Inserts review into DB and returns review to client
router.post('/reviews', (req, res) => {
    con.query(`INSERT INTO reviews (user_id, restaurant_id, rating, price, body) VALUES (${con.escape(req.body.by)},${con.escape(req.body.for)},${con.escape(req.body.rating)}, ${con.escape(req.body.price)}, ${con.escape(req.body.body)})`,
        (err, rows) => {
            if (err) throw err;
            if(debug) console.log(rows);
            con.query(`SELECT * FROM reviews WHERE id = ?`, [rows.insertId], (err, rows) => {
                if (err) throw err;
                res.json(rows[0]);
            })
        })
})

//Gets all reviews for specified restaurant
router.get('/reviews/:id', (req, res) => {
    con.query(`SELECT 
        u.displayname, rev.rating, rev.price, rev.body 
        FROM reviews rev 
        INNER JOIN users u ON rev.user_id = u.id 
        WHERE rev.restaurant_id = ?`, [req.params.id],
        (err, rows) => {
            if (err) throw err;
            res.json(rows);
        } 
    )
})


module.exports = router;
