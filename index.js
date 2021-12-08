const express = require('express'),
    pug = require('pug'),
    path = require('path'),
    routes = require('./routes/routes'),
    http = require('http');

    const app = express();

    const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);


const expressSession = require('express-session');

app.use(expressSession({
    secret:'whatever',
    saveUninitialized: true,
    resave: true
}));
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
app.post("/signup",urlEncodedParser, routes.signUpAction);
app.get("/login", routes.logIn);
app.post("/login", urlEncodedParser, routes.logInAction);
app.get("/dashboard", checkAuthorization, routes.dashboard);
app.get("/blackjack", checkAuthorization, routes.blackjack);
app.get("/slots", checkAuthorization, routes.slots);
app.post("/addBal",urlEncodedParser, routes.addBal);
app.post("/changeNickname",urlEncodedParser, routes.changeNickName);
app.post("/remBal",urlEncodedParser, routes.remBal);

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

io.on('connection', (socket) => {
    socket.on('chat message', msg => {
    io.emit('chat message', msg);
    });
});

server.listen(process.env.PORT || 3000);