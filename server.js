function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

import express from "express";

const app = express();
// app.use(requireHTTPS);
app.use(express.static('dist/ruby-angular-todo-client/'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: './dist/ruby-angular-todo-client/'});
});

app.listen(8080, () => {
    console.log('server started')
});