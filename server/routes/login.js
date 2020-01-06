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
        const token = jwt.sign({uid: String(user.id)}, 'kevin fridman was here', {
            expiresIn: '2h'
        });

        req.session.token = token;

        console.log(req.session.token);

        //Send user
        res.send({user, token});
    }).catch(err => {
        res.status(500);
        console.error(err);
    });
});

module.exports = router;
