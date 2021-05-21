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
    lans = db.view('suburb', 'citySuburbLanguage', {reduce: true, group_level: 3}, function(err, data) {    
        if (!err) {  

            const cities = data.rows.reduce((cities, item) => {
                const place = (cities[item.key[0]] || []);
                
                var newItem = {
                  key : [item.key[1],item.key[2]],
                  value : item.value
                }
  
                place.push(newItem);
                cities[item.key[0]] = place;
                return cities;
              }, {});
              
            var city_stats = {};
            for (const city in cities) {
                const summary = cities[city];
   
                const dates = summary.reduce((dates, item) => {
                    const place = (dates[item.key[0]] || []);
                    
                    var newItem = {
                      key : item.key[1],
                      value : item.value
                    }
      
                    place.push(newItem);
                    dates[item.key[0]] = place;
                    return dates;
                  }, {});

                  var dates_sorted = {}
                  for (const date in dates) {
                    
                    const summary = dates[date];
                    const returnJson = [];
                    const targetLanguage = ['es', 'in', 'ja', 'pt']
                    summary.forEach(function (value, index, array){

                      if (targetLanguage.includes(value.key)) {
                        const item = {"name":`${value.key}`, "value": parseInt(value.value)}
                        returnJson.push(item)
                      }
                    })
                    returnJson.forEach(function(value){
                        value["name"] = langDict.find(el => el.code == value.name).name;
                      })     

                    var top5 = {
                        "French" : 0, 
                        "Spanish" : 0,
                        "Indonesian" : 0,
                        "Japanese" : 0,
                        "Portuguese" : 0
                    }
                    for (const lang in returnJson) {
                        const item = returnJson[lang];
                        top5[item.name] = item.value;
                    }
                    dates_sorted[date] = top5
                  }
                  city_stats[city] = dates_sorted
            }
            res.json(city_stats)
        } 
        else {
            res.send(err);
        };
    });   
});

module.exports = router;