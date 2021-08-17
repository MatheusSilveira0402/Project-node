module.exports = function(application){
    
    //rotas da api para usuarios
    
    application.get('/api/usuario/get', function(req, res){
        application.app.controllers.usuario.getUser(application, req, res);
    });

    application.post('/api/usuario/set', function(req, res){
        application.app.controllers.usuario.setUser(application, req, res);
    });
    //não ultilizar....
    application.path('/api/usuario/update', function(req, res){
        application.app.controllers.usuario.updateUser(application, req, res);

    });

    application.post('/api/usuario/autenticar', function(req, res){
        application.app.controllers.usuario.autenticar(application, req, res);
    });


    application.post('/api/usuario/getonly', function(req, res){
        application.app.controllers.usuario.getOnlyUser(application, req, res);
    });

    //rotas da api para empressa
    application.get('/api/empressa/get', function(req, res){
        application.app.controllers.empressas.getEmpressa(application, req, res);
    });


    application.post('/api/empressa/getonly', function(req, res){
        application.app.controllers.empressas.getOneEmpressa(application, req, res);
    });

    application.post('/api/empressa/set', function(req, res){
        application.app.controllers.empressas.setEmpressa(application, req, res);
    });
    //não ultilizar ......
    application.path('/api/empressa/update', function(req, res){
        application.app.controllers.empressas.updateEmpressa(application, req, res);""
    });


    

}