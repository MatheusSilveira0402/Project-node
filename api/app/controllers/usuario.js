module.exports.getUser = function(application, req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");

    var connection = application.config.connectiondb;
	var UsuariosDAO = new application.app.models.UsuarioDAO(connection);

    UsuariosDAO.listarUsuario(res, req);
}

module.exports.setUser = function(application, req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    var dados = req.body;

    var connection = application.config.connectiondb;
	var UsuariosDAO = new application.app.models.UsuarioDAO(connection);

    UsuariosDAO.inserirUsuario(dados, res, req);
}

module.exports.updateUser = function(application, req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    var dados = req.body;

    var connection = application.config.connectiondb;
	var UsuariosDAO = new application.app.models.UsuarioDAO(connection);

    UsuariosDAO.updateUsuario(dados, res, req);
}

module.exports.autenticar = function(application, req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    var dados = req.body;

    var connection = application.config.connectiondb;
	var UsuariosDAO = new application.app.models.UsuarioDAO(connection);

    UsuariosDAO.autenticarUsuario(dados, res, req);
}

module.exports.getOnlyUser = function(application, req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    var dados = req.body;

    var connection = application.config.connectiondb;
	var UsuariosDAO = new application.app.models.UsuarioDAO(connection);

    UsuariosDAO.getOnlyUsuario(dados, res, req);
}
