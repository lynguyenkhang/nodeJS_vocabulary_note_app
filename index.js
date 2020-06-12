var express = require('express');
var app = express();
var db = require('./db.js');

var port = 3000;
var bodyParser = require('body-parser');
var englishRoute = require('./routes/english.route.js');
var japaneseRoute = require('./routes/japanese.route.js');

// THIS IS MIDDLEWARE. THINH WILL TEACH THIS LATER
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine','pug');
app.set('views','./views')

app.use(express.static('public'));

app.get('/', function(req,res) {
	res.render('index.pug', {
		phrases: db.get('english').value(),
		japanese_phrases: db.get('japanese').value()
	});
})

app.use('/english', englishRoute);
app.use('/japanese', japaneseRoute);

app.listen(port, function() {
	console.log('Example app listening at port' + port);
});