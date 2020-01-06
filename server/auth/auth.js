const bcrypt = require('bcryptjs');
const con = require('../sql/connect');

module.exports = (email, password) => {
    return new Promise((resolve, reject) => {
        console.log(email);
        console.log(password);
        con.query('SELECT * FROM users WHERE email=?', [email], (err, rows) => {
            if (err) throw err;

            let user = rows[0];
    
            if (user) {
                bcrypt.compare(password, user.password, (err, auth) => {
                    if (err) throw err;
                    auth ? 
                    resolve({
                        id: user.id,
                        displayname: user.displayname,
                        email: user.email
                    }) 
                    : resolve(false);
                });

            } else {
                resolve(false);
            }
        });
    })
}