module.exports.home = function(application, req, res){
  res.render("index.ejs", {validacao : {}});
}
module.exports.autenticar = function(application, req, res){

    var dadosForm = req.body;
    console.log(dadosForm)
    req.assert('usuario', 'Nome não pode ser vazio').notEmpty();
	req.assert('senha', 'Senha não pode ser vazio').notEmpty();
    
    var erros = req.getValidationResult();
    console.log(erros)

    if(erros){
        res.render("index", {validacao:erros});
        return;
    }

    var connection = application.config.dbConnection;
    var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
    
    UsuariosDAO.autenticar(dadosForm, req, res);

    

    //res.send('tudo ok para criar a sessão');
}
