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
    lans = db.view('language', 'dateLanguage', {reduce: true, group_level: 2}, function(err, data) {    
        if (!err) {  
            // console.log(data.rows);

            const dates = data.rows.reduce((dates, item) => {
              const day = (dates[item.key[0]] || []);
              
              var newItem = {
                key : item.key[1],
                value : item.value
              }

              day.push(newItem);
              dates[item.key[0]] = day;
              return dates;
            }, {});
            
            // console.log(dates)
            var dates_sorted = {}
            for (const date in dates) {
              
              // console.log(date)
              const summary = dates[date];
              
              // console.log(summary)
              const returnJson = [];
              const targetLanguage = ['es', 'in', 'ja', 'pt', 'fr']
              summary.forEach(function (value, index, array){
                // if (value.key != 'und') {
                if (targetLanguage.includes(value.key)) {
                  const item = {"name":`${value.key}`, "value": parseInt(value.value)}
                  returnJson.push(item)
                }
              })
              // console.log(returnJson)

              var top5 = returnJson.slice(0,5);
              top5.forEach(function(value){
                value["name"] = langDict.find(el => el.code == value.name).name;
              })
              // console.log(top5)
              dates_sorted[date] = top5
            }
            // console.log(dates_sorted)
            res.json(dates_sorted)
        } 
        else {
            res.send(err);
        };
    });    
});

module.exports = router;