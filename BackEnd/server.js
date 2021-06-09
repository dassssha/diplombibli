const mysql = require("mysql2");//mysql
const express = require("express"); //сам фреймворк
const dbConfig = require("./app/config/db.config")

const app = express();//создаем объект приложения express

const pool = mysql.createPool({
    connectionLimit: 5,
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user: dbConfig.USER,
    database: dbConfig.DB,
    password: dbConfig.PASSWORD
});

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// определяем обработчик для маршрута "/"
// получение списка перечня всех гостов (корнейвой адрес приложения)
app.get("/", function (req, res) {
    pool.query("SELECT * FROM `all_gosts`", function (err, data) {
        if (err) return console.log(err);
        console.log(data);
        res.json(data)
    });
});


// app.get("/:NAME", function (req, res,next) {
//     const NAME = req.params.NAME;
//     pool.query("SELECT * FROM `" + NAME + "`", function (err, data) {
//         if (err) return console.log(err);
//         console.log(data);
//         res.json(data)
//     });
// });
// //В определении маршрута параметры предваряются знаком двоеточия:
app.get("/:NAME", function (req, res) {
    const NAME = req.params.NAME;
    var queryStr = "SELECT * FROM `" + NAME + "`";
    pool.query(queryStr, function (err, data) {
        if (err) return console.log(err);
        console.log(data);
        res.json(data);
    });
});

//этот  фрагмент отвечает за поднятие параметров для гайки обычной
app.get("/:GOST/:ID", function (req, res) {
    const GOST = req.params.GOST;
    const ID = req.params.ID;
    var queryStr = "SELECT * FROM `" + GOST + "` WHERE all_gosts_id = " + ID;
    console.log('111111111');
    pool.query(queryStr, function (err, data) {
        if (err) return console.log(err);
        console.log(data);
        res.json(data);
    });
});


app.get("/rezb/:GOST/:ID/", function (req, res) {
    const GOST = req.params.GOST;
    const ID = req.params.ID;
    var queryStr = "SELECT * FROM `rezb_"+ GOST + "` WHERE `"+ GOST +"_id` = " + ID;
    console.log('GHBBBBDT5N');
    pool.query(queryStr, function (err, data) {
        if (err) return console.log(err);
        console.log(data);
        res.json(data);
    });
});

//этот фрагмент отвечает за поднятие параметров для гайки с фланцем
app.get("/:NAME/:GOST/:ID", function (req, res) {
    const GOST = req.params.GOST;
    const ID = req.params.ID;
    const NAME = req.params.NAME;
    var queryStr = "SELECT * FROM `" + GOST + "` WHERE `"+ NAME +"_id`= " + ID;
    console.log('111111111');
    pool.query(queryStr, function (err, data) {
        if (err) return console.log(err);
        console.log(data);
        res.json(data);
    });
});

app.get("/:NAME/rezb/:GOST/:ID/", function (req, res) {
    const GOST = req.params.GOST;
    const ID = req.params.ID;
    var queryStr = "SELECT * FROM `rezb_"+ GOST + "` WHERE `"+ GOST +"_id` = " + ID;
    console.log('GHBBBBDT5N');
    pool.query(queryStr, function (err, data) {
        if (err) return console.log(err);
        console.log(data);
        res.json(data);
    });
});



app.listen(3000, function () /*показывает, на каком порту будет сервер*/{
    console.log("Сервер работает на порту 3000");
});