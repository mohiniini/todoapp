const notess = require('./routes/Notes');
const user = require('./routes/user');
const router = require('express');
const app = router();
module.exports = (app) => {
    app.use(router.json());

    app.use('/api/user', user);
    app.use('/api/notes', notess);

    // app.use(function(err, req, res, next) {
    //     res.json({ 'error': err.message })
    // });
}