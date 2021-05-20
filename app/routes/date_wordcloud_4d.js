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
        // var dateRange = [];
        // // console.log(data.rows)

        // var firstDay = new Date(data.rows[0].key[0]) //first day in the database
        // // var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);

        // console.log(firstDay)
        // console.log(lastDay)

        // // console.log(firstDay.toISOString().split("T")[0]) //from date type to string
        
        // // console.log(nextWeek)
        if (!err) {  
            var lastDay = new Date(data.rows[data.rows.length - 1].key[0])
            var fourDaysAgo = new Date(lastDay.getTime() - 3 * 24 * 60 * 60 * 1000);
            
    
            var daylist = getDaysArray(fourDaysAgo,lastDay).map((v)=>v.toISOString().slice(0,10));
            
            // console.log(daylist)
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
            // var dates_sorted_array = [];
            // var dates_array = [];
            for (const date in dates) {
                if (daylist.includes(date)) {
                    // console.log(date)
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
                    //   console.log(returnJson)

                    var top5 = returnJson.slice(0,20);
                    //   console.log(top5)
                    
                    dates_sorted[date] = top5
                }
                

            };

            // console.log(dates_sorted[dates_sorted.length-5, dates_sorted.length-1])
            res.json(dates_sorted)
        } 
        else {
            res.send(err);
        };
    });    
});

module.exports = router;