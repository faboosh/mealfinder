const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json([{
        id: 1,
        name: 'Krusty Krab',
        avgRating: 4,
        category: 'Fast food',
        description: 'Best burgers in Bikini Bottom',
        price: 1
    },
    {
        id: 2,
        name: 'Texas Longhorn',
        avgRating: 5,
        category: 'Grill',
        description: 'Perfect atmosphere for a night out.',
        price: 2
    }]);
});

module.exports = router;
