const express = require('express');
const router = express.Router();
const langDict = require('../dictionary/LangDict')

// require nano and set params
const username = 'admin';
const userpass = 'admin';
const nano = require('nano')('http://'+username+':'+userpass+'@172.26.129.198:5984'); //http://172.20.0.2

const db = nano.db.use('twitter');

const app = express()
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

router.get('/', function (req, res){
    res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    });
    // nano get views: db.view(design name, view name)
    lans = db.view('suburb', 'suburbLanguage', {reduce: true, group_level: 1}, function(err, data) {    
        if (!err) {  
            // console.log(data.rows);
            data.rows.sort(function(a, b) {
              return b.value - a.value;
            });
            const returnJson = [];
            
            data.rows.forEach(function (value, index, array){
              if (value.key != 'und') {
                const item = {"name":`${value.key}`, "value": value.value}
                returnJson.push(item)
              }
            })
            // console.log(returnJson)

            var top5 = returnJson.slice(0,5);
            res.json(returnJson)
            // res.json(data.rows)
        } 
        else {
            res.send(err);
        };
    });    
});

module.exports = router;