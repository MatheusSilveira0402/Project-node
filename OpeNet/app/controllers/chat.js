module.exports.rodandochat = function(application, req, res){
    var dadosForm = req.body;
   
    application.get('io').emit(
        'msgParaClient', 
        {usuario :  dadosForm.usuario, mensagem: ' acabou de entrar no chat'});
        
    
        res.render("chat.ejs", {dadosform:  dadosForm});
    

}