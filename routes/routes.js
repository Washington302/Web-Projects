const {MongoClient, ObjectId} = require('mongodb');

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
    let hash = bcrypt.hashSync(req.body.pass, salt);
    let account = {
        username: req.body.username,
        password: hash,
        currency:1000
    }
    const insertResult = await collection.insertOne(account);
    client.close();
};

exports.logIn = (req, res) => {
    res.render("login",{});
};

exports.logInAction = async (req, res) => {
    await client.connect();
    const userResults = userCollection.find({username: req.body.username})
    client.close();
    if(userResults.pass == req.body.pass){
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
}

exports.dashboard = (req, res) => {
    res.render("dashboard",{});
};

exports.blackJack = (req, res) => {

};

exports.roulette = (req, res) => {

};

exports.slots = (req, res) => {

};

exports.poker = (req, res) => {

};