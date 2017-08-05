var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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
   let title = data.title;
   let heading = data.heading;
   let content = data.content;

   let html = `
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

app.get('/:articel', (req, res) => {
   let name = req.params.articel;
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
