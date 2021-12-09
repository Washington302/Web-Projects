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
        // res.render("dashboard",{
        //     title: "Dashboard",
        //     user: userResults
        // }) 
        res.redirect("/dashboard")
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

exports.blackjack = (req, res) => {
    let userData = req.session.user;
    res.render("blackJack", {
        username: userData.username
    });
};

exports.slots = (req, res) => {
    res.render("slots", {});
};

// exports.changeNickName = async (req, res) => {
//     client.connect();
//     user = req.session.user;
// let newNickname = req.body.nickname;
// console.log(newNickname);

//     const updateUser = userCollection.replaceOne({username: user.username},{$set: {nickname: newNickname}});
//     client.close();
//     res.redirect("dashboard",{})
// }

// exports.changePassword = (req, res) => {
//     res.redirect("dashboard",{})
// }

exports.addBal = async (req, res) => {
    user = req.session.user;
    await client.connect();
    const findUser = await userCollection.findOne({username: user.username});
    let money = parseInt(findUser.currency);
    money += req.body.money;
    const updateUser = await userCollection.replaceOne({username: user.username},{$set: {currency, money}});
    client.close();
    res.redirect(req.body.path, {})
}

exports.remBal = async (req, res) => {
    user = req.session.user;
    await client.connect();
    const findUser = await userCollection.findOne({username: user.username});
    let money = parseInt(findUser.currency);
    money += req.body.money;
    const updateUser = await userCollection.updateOne({username: user.username},{$set: {currency, money}});
    client.close();
    res.redirect(req.body.path, {})
}