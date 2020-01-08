const jwt = require('jsonwebtoken');
const con = require('../sql/connect');

module.exports = async (req, res, next) => {
    try {
        const token = jwt.verify(req.cookies['authentication'], 'kevin fridman was here');

        con.query('SELECT * from users where id = ?', [token.id], (err, rows) => {
            if (err) throw err;

            const user = rows[0];

            req.verifiedUser = {
                id: user.id,
                email: user.email,
                displayname: user.displayname
            };

            //Token from UID
            /*const newToken = jwt.sign({ id: String(user.id) }, 'kevin fridman was here', {
                expiresIn: '2h'
            });*/

            console.log(token);

            //res.cookie('authentication', newToken, { maxAge: 2 * 3600 * 1000, httpOnly: false });

            next();

        });
    } catch (err) {
        next();
    }
}