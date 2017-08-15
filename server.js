var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var app = express();
app.use(morgan('combined'));

var config = {
  user: 'venky25',
  database: 'venky25',
  host: 'db.imad.hasura-app.io',
  port: '5432',
  password: process.env.DB_PASSWORD  //'db-venky25-98931' 
}

var data = {
   "articel-one" : {
     "title" : "Articel One | Venky",
     "heading": "Articel One",
     "content": "<p> Articel One Content</p>"
   },
   "articel-two" : {
     "title" : "Articel Two | Venky",
     "heading": "Articel Two",
     "content": "<p> Articel Two Content</p>"
   }
}

var CreatHtml = (data) => {
   var title = data.title;
   var heading = data.heading;
   var content = data.content;

   var html = `
      <html>
        <head>
          <title>${title}</title>
          <meta name="viewport" content="width=device-width, inital-scale=1"/>
        </head>
        <body>
          <h1>${heading}</h1>
          <div class="container">
            ${content}
          </div>
        </body>
      </html>
   `;


   return html;
}

var pool = new Pool(config);

app.get('/test-db', (req, res)=>{
   pool.query('select * from "ARTICLE"', function(error, result){
     if(error){
       console.log('Error DB : ', error);
       res.status(500).send(error.toString());
     }
     else{
       console.log('Data : ', result);
       res.status(200).send(JSON.stringify(result.rows));
       
     }
   })
})

app.get('/:articel', (req, res) => {
   var name = req.params.articel;
   console.log(data[name]);
   res.send(CreatHtml(data[name]));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 8080;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
