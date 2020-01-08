var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../auth/auth');

//Authenticates user
router.post('/', (req, res, next) => {
    auth(req.body.email, req.body.password).then(user => {
        console.log(user);
        console.log('User from db ^');

        //Token from UID
        const token = jwt.sign({id: String(user.id)}, 'kevin fridman was here', {
            expiresIn: '2h'
        });

        console.log(token);

        res.cookie('authentication', token, {maxAge: 2 * 3600 * 1000, httpOnly:false});

        //Send user
        res.send({user});
    }).catch(err => {
        res.status(401);
        console.error(err);
    });
});

module.exports = router;
