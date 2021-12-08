const {MongoClient, ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');

const url = `mongodb+srv://group:pro150@userinformation.xrasy.mongodb.net/UserInformation?retryWrites=true&w=majority`;

const client =  new MongoClient(url);

const dbName = 'UserInformation';

const db = client.db(dbName);

const userCollection = db.collection("Account")

const config = require('../config');
const fs = require('fs');

exports.home = (req, res) => {
    res.render("home", {});
};

exports.signUp = (req, res) => {
    res.render("signup",{});
};

exports.signUpAction = async (req, res) => {
    await client.connect();
    let salt = bcrypt.genSaltSync(10);
    
    let pass = req.body.password;
    
    let hash = bcrypt.hashSync(pass, salt);
    let account = {
        username: req.body.username,
        nickname: req.body.username,
        password: hash,
        currency:1000,
        email: req.body.email,
    }
    const findUser = await userCollection.findOne({username: req.body.username});
    if (!(findUser === undefined)) {
        const insertResult = await userCollection.insertOne(account);
    }
    else {
        alert("Could not create an account. Please use a different username.");
    }
    client.close();
    res.redirect("/")
};

exports.logIn = (req, res) => {
    res.render("login",{});
};

exports.logInAction = async (req, res) => {
    await client.connect();
    const userResults = await userCollection.findOne({username: req.body.username})
    client.close();

    if(bcrypt.compareSync(req.body.password, userResults.password)){
        req.session.user = {
            isAuthenticated: true,
            username: req.body.username
        }
        res.redirect("/dashboard");

        // res.render("dashboard",{
        //     title: "Dashboard",
        //     user: userResults
        // })  
    }else{
        res.redirect("login")
    }
}

exports.dashboard = async (req, res) => {
    await client.connect();
let user = req.session.user;

    const userResults = await userCollection.findOne({username: user.username})
    client.close();


    res.render("dashboard",{
        title: "Dashboard",
        user: userResults

    });
};

exports.blackjack = async (req, res) => {
    const userResults = await userCollection.findOne({username: req.session.user.username});
    res.render("blackJack", {
        user: userResults
    });
};

exports.slots = (req, res) => {
    res.render("slots", {});
};

exports.changeNickName = async (req, res) => {
    client.connect();
    let userData = req.session.user
    const updateUser = userCollection.updateOne({username: userData.username},{$set: {nickname: req.body.nickname}});
    client.close();
    res.redirect("dashboard",{})
}

exports.changePassword = (req, res) => {
    res.redirect("dashboard",{})
}

exports.addBal = (req, res) => {
    client.connect();
    let userData = req.session.user
    const findUser = userCollection.findOne({username: userData.username});
    let money = parseInt(findUser.currency);
    money += req.body.money;
    const updateUser = userCollection.updateOne({username: userData.username},{$set: {currency, money}});
    client.close();
    res.redirect(req.body.path, {})
}

exports.remBal = (req, res) => {
    client.connect();
    const findUser = userCollection.findOne({username: userData.username});
    let money = parseInt(findUser.currency);
    money += req.body.money;
    const updateUser = userCollection.updateOne({username: userData.username},{$set: {currency, money}});
    client.close();
    res.redirect(req.body.path, {})
}