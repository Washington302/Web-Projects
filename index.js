const express = require('express'),
    pug = require('pug'),
    path = require('path'),
    routes = require('./routes/routes'),
    expressSession = require('express-session'),
    bcrypt = require('bcryptjs');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname+'/views');
app.use(express.static(path.join(__dirname, '/public')));

const urlEncodedParser = express.urlencoded({
    extended: false
});

const checkAuthorization = (req, res, next) => {
    if(req.session.user && req.session.user.isAuthenticated) {
        next();
    }
    else {
        res.redirect('/login');
    }
};

app.get("/", routes.home);
app.get("/signup", routes.signUp);
app.post("/signup", routes.signUpAction);
app.get("/login", routes.logIn);
app.post("/login", urlEncodedParser, routes.logInAction);
app.get("/dashboard", checkAuthorization, routes.dashboard);
app.get("/poker", routes.poker);
app.get("/blackjack", routes.blackJack);
app.get("/slots", routes.slots);
app.get("/roulette", routes.roulette);

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});

app.listen(3000);