var db = require('../db.js');
var shortid = require('shortid');
var bodyParser = require('body-parser');


module.exports.index =  function(req, res) {
	res.render('english/index', {
		phrases: db.get('english').value(),
		keyword: 'searching phrase'
	});
}

module.exports.search = function(req, res) {
	var q = req.query.searchedPhrase;
	var matchedPhrase = db.get('english').value().filter(function(phrase) {
		return phrase.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	// console.log(matchedPhrase);
	res.render('english/index', {
		phrases: matchedPhrase,
		keyword: q
	})
}

// CREATE
module.exports.getCreate = function(req, res) {
	res.render('english/create');
}

module.exports.postCreate = function(req,res) {
	// console.log(req.body);
	req.body.id = shortid.generate();
	if(req.body.name !== '') {
		// use unshift instead of push, because 
		// add an element in beginning part of array
		db.get('english').unshift(req.body).write();
	}
	res.redirect('/english');
}

// DELETE
module.exports.getDelete = function(req,res) {
	res.render('english/delete');
}

module.exports.postDelete = function(req, res) {
	var deletedPhraseName = req.body.name;
	var phrasesNameList = db.get('english').value().map(function(phrase) {
		return phrase.name;
	});
	if((phrasesNameList.indexOf(deletedPhraseName)) !== -1) {
		db.get('english').remove(req.body).write();
	}
	res.redirect('/english');

}

//VIEW

module.exports.view = function(req, res){
	var id = req.params.id;
	// console.log(req.params);
	// var viewedPhrase = req.params
	var viewedPhrase = db.get('english').find({ "id": id}).value();
	console.log(viewedPhrase);

	res.render('english/view_update', {
		phrase: viewedPhrase
	});
}

// CHECK WHEATHER THE CONTENT INSIDE "UPDATE" INPUT
// IS EMPTY OR NOT
function checkNull(checkedWord,id, type) {
	var result = '';
	var viewedPhrase = db.get('english').find({ "id": id}).value();
	if(checkedWord !== ''){
		result = checkedWord;
	} else {
		result = viewedPhrase[type];
	}
	return result;
}





module.exports.update = function(req, res) {
	var id = req.params.id;
	var newName = checkNull(req.body.name, id,"name");
	var newMeaning = checkNull(req.body.meaning, id,"meaning");
	var newExample = checkNull(req.body.example, id,"example");

	db.get('english').find({ "id": id }).assign({
		"name": newName,
		"meaning": newMeaning,
		"example": newExample
	}).write();

	res.redirect('/english');
}











