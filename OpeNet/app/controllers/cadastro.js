module.exports.cadastro = function (application, req, res){
	res.render('cadastro', {validacao: {}, dadosForm: {}});
}

module.exports.cadastrar = function(application, req, res){

	var dadosForm = req.body;

    req.assert('usuario', 'Nome ou apelido não pode ser vazio').notEmpty();
    req.assert('usuario', 'Nome ou apelido tem possuir no minímo 3 letras e no maxímo 15').len(3, 15);
    req.assert('senha', 'Senha não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha tem possuir no minímo 3 letras e no maxímo 15').len(3, 15);

	var erros = req.validationErrors();

	if(erros){
		res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
		return;
	}

	var connection = application.config.dbConnection;
	console.log(connection);
	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
	console.log(UsuariosDAO);

	UsuariosDAO.inserirUsuario(dadosForm);
	
	//geração dos parametros

	res.send('podemos cadastrar')
}