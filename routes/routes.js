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
    
    console.log(pass);
    let hash = bcrypt.hashSync(pass, salt);
    let account = {
        username: req.body.username,
        nickname: req.body.username,
        password: hash,
        currency:1000,
        email: req.body.email,
    }
    const findUser = await userCollection.findOne({username: req.body.username});
    if (findUser === undefined) {
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
    console.log(req.body.password)
    const userResults = userCollection.find({username: req.body.username})
    if(bcrypt.hashSync(req.body.password, userResults.password) && userResults != undefined){
        req.session.user = {
            isAuthenticated: true,
            username: req.body.username
        }
        res.render("dashboard",{
            title: "Dashboard",
            user: userResults
        })
    }else{
        res.redirect("login")
    }
    client.close();
}

exports.dashboard = (req, res) => {
    res.render("dashboard",{});
};

exports.blackjack = (req, res) => {
    res.render("blackJack", {});
};

exports.roulette = (req, res) => {
    res.render("roulette", {});
};

exports.slots = (req, res) => {
    res.render("slots", {});
};

exports.poker = (req, res) => {
    res.render("poker", {});
};

exports.changeNickName = (req, res) => {
    client.connect();
    const updateUser = userCollection.updateOne({username: req.session.username},{$set: {nickname: req.body.Nickname}});
    client.close();
    res.redirect("dashboard",{})
}

exports.changePassword = (req, res) => {
    res.redirect("dashboard",{})
}

exports.addBal = (req, res) => {
    const findUser = userCollection.findOne({username: req.session.username});
    let money = parseInt(findUser.currency);
    money += req.body.money;
    const updateUser = userCollection.updateOne({username: req.session.username},{$set: {currency, money}});
    res.redirect(req.body.path, {})
}

exports.remBal = (req, res) => {
    const findUser = userCollection.findOne({username: req.session.username});
    let money = parseInt(findUser.currency);
    money += req.body.money;
    const updateUser = userCollection.updateOne({username: req.session.username},{$set: {currency, money}});
    res.redirect(req.body.path, {})
}