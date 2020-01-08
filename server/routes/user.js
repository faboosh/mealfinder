const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/middleware');


/* GET home page. */
router.get('/',authMiddleware, function(req, res, next) {
    res.json(req.verifiedUser);
});

router.get('/logout', function(req, res, next) {
    //res.cookie('authentication', '', {expires: 'Thu, 01 Jan 1970 00:00:00 UTC}'});
    console.log(req.cookies['authentication']);
    res.status(200);
});

module.exports = router;
