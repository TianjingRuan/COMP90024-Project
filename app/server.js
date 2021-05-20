const express = require('express');
const path = require('path');
var cors = require('cors')

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

app.use(cors()) // Use this after the variable declaration

// define map reduce view


const language = {
  "_id": "_design/language",
  "views": {
      "language": {
        "reduce": "_sum",
        "map": "function(doc) {\n  if (doc.lang) {\n emit([doc.lang], 1);\n  }\n}"
      },
      "cityDateLanguage": {
        "reduce": "_sum",
        "map": "function(doc) {\n  if (doc.lang && doc.date && doc.city) {\n emit([doc.city, doc.date, doc.lang], 1);\n  }\n}"
      },
      "dateLanguage": {
        "reduce": "_sum",
        "map": "function(doc) {\n  if (doc.lang && doc.date) {\n emit([doc.date, doc.lang], 1);\n  }\n}"
      }
    },
  "language": "javascript"
}

db.insert(language, function(err, data) {
  // if (err) {
  //   res.send(err);
  // }
});

const suburb = {
  "_id": "_design/suburb",
  "views": {
      "citySuburbLanguage": {
        "reduce": "_sum",
        "map": "function(doc) {\n  if (doc.lang && doc.date && doc.suburb) {\n emit([doc.suburb, doc.date, doc.lang], 1);\n  }\n}"
      },
      "suburbLanguage": {
        "reduce": "_sum",
        "map": "function(doc) {\n  if (doc.lang && doc.suburb) {\n emit([doc.suburb, doc.lang], 1);\n  }\n}"
      }
    },
  "language": "javascript"
}



db.insert(suburb, function(err, data) {
  // if (err) {
  //   res.send(err);
  // }
});

const wordcloud = {
  "_id": "_design/wordcloud",
  "views": {
      "wordcloud": {
        "reduce": "_sum",
        "map": "function(doc) {\n  if(doc.entities.hashtags.length > 0) {\n  for(var idx in doc.entities.hashtags) {\n emit([doc.date, doc.entities.hashtags[idx].text.toLowerCase()], 1);\n  }\n  }\n}"
      }
    },
  "language": "javascript"
}

db.insert(wordcloud, function(err, data) {
  // if (err) {
  //   res.send(err);
  // }
});
// end of define map reduce view


// All routes are placed below
app.use('/scenario/language', require('./routes/language'));
app.use('/scenario/date_language', require('./routes/date_language'));
app.use('/scenario/city_date_language', require('./routes/city_date_language'));
app.use('/scenario/date_wordcloud', require('./routes/date_wordcloud'));
app.use('/scenario/date_wordcloud4', require('./routes/date_wordcloud_4d'));
app.use('/scenario/suburb', require('./routes/suburb'));

// All routes are placed above


app.listen(5000, function(){
  console.log('Server started on port 5000')
});