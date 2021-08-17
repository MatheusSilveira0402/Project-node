

module.exports.getEmpressa = function(application, req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");

    var connection = application.config.connectiondb;
	var EmpressaDAO = new application.app.models.EmpressaDAO(connection);

    EmpressaDAO.listarEmpressa(res, req);
}

module.exports.setEmpressa = function(application, req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    /*
    var fsx = require('fs-extra');
    var fs = require('fs');

    
    console.log(req.files);
    
    var date = new Date();
    time_stamp = date.getTime();

    var url_image = time_stamp + '_' + req.files.arquivo.originalFilename;
    
    var path_origem = req.files.arquivo.path;
    var path_destino = "./app/public/uploads/" + url_image;
    
    fsx.move(path_origem, path_destino, function(err){
        if(err){
            res.status(500).json({error: err});
            return;
        }
        
    });

    dados.url_image = url_image;*/
    var dados = req.body;
    
    var connection = application.config.connectiondb;
	var EmpressaDAO = new application.app.models.EmpressaDAO(connection);

    EmpressaDAO.inserirEmpressa(dados, res, req);

}
module.exports.updateEmpressa = function(application, req, res){
    var dados = req.body;
    res.setHeader("Access-Control-Allow-Origin", "*");

    var connection = application.config.connectiondb;
	var EmpressaDAO = new application.app.models.EmpressaDAO(connection);

    EmpressaDAO.updateEmpressa(dados, res, req);

}

module.exports.getOneEmpressa = function(application, req, res){
    var dados = req.body;
    res.setHeader("Access-Control-Allow-Origin", "*");

    var connection = application.config.connectiondb;
	var EmpressaDAO = new application.app.models.EmpressaDAO(connection);

    EmpressaDAO.getOnlyEmpressa(dados, res, req);

}