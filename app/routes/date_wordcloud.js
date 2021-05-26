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

Object.defineProperty(Array.prototype, 'chunk', {
    value: function(chunkSize) {
      var R = [];
      for (var i = 0; i < this.length; i += chunkSize)
        R.push(this.slice(i, i + chunkSize));
      return R;
    }
  });

Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

var getDaysArray = function(start, end) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};


router.get('/', function (req, res){
    res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    });
    // nano get views: db.view(design name, view name)
    lans = db.view('wordcloud', 'wordcloud', {reduce: true, group_level: 2}, function(err, data) {    

        if (!err) {  
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
            var dates_sorted = {};
            for (const date in dates) {
                
            //   console.log(date)
              const summary = dates[date];
              summary.sort(function(a, b) {
                return b.value - a.value;
              });
              
            //   console.log(summary)
              const returnJson = [];
              
              summary.forEach(function (value, index, array){
                if (value.key != 'und') {
                  const item = {"value":`${value.key}`, "count": parseInt(value.value)}
                  returnJson.push(item)
                }
              });

              var top5 = returnJson.slice(0,20);
              dates_sorted[date] = top5
            };
            res.json(dates_sorted)
        } 
        else {
            res.send(err);
        };
    });    
});

module.exports = router;