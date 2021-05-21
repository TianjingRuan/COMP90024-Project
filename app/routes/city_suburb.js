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
    lans = db.view('suburb', 'citySuburbLanguage', {reduce: true, group_level: 2}, function(err, data) {    
        if (!err) {  
            // console.log(data.rows);

            const cities = data.rows.reduce((cities, item) => {
              const place = (cities[item.key[0]] || []);
              
              var newItem = {
                key : item.key[1],
                value : item.value
              }

              place.push(newItem);
              cities[item.key[0]] = place;
              return cities;
            }, {});
            
            // console.log(cities)
            var cities_sorted = {}
            for (const city in cities) {
              const summary = cities[city];
              const returnJson = {};

              summary.forEach(function (value, index, array){
                const suburb = value.key.toString()
                const item = {[suburb] : parseInt(value.value)}
                returnJson[suburb] = parseInt(value.value);
              })
                cities_sorted[city] = returnJson
            }
            // console.log(cities_sorted)
            res.json(cities_sorted)
        } 
        else {
            res.send(err);
        };
    });    
});

module.exports = router;