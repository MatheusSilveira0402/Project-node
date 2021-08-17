const { json } = require("body-parser");

module.exports = function(application){
	application.get('/', function(req, res){
		res.format({
			html: function(){
				res.send('Bem vindo a sua app NodeJS!');
			},
			json: function(){
				var restorno = {
					body: 'Bem vindo a sua app NodeJS!'
				}
				res.json(restorno);
			}

		});


		
	});
}