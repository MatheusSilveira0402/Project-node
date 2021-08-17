const crypto = require("crypto");



/* Aqui vai ter funções que se conectaram com banco de dados*/
function EmpressaDAO(connection){
    this._connection = connection();
    
}



EmpressaDAO.prototype.listarEmpressa = function(res, req){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection('empressa', function(err,  collection){
            collection.find().toArray( function(err, results){
                if(err){
                    res.json(err);
                } else {
                   
                    
                    res.json(results);
                    
                }
                mongoclient.close();
            });
        });
    });
}

EmpressaDAO.prototype.inserirEmpressa = function(dados,res, req){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection('empressa', function(err,  collection){
            var nome = dados.nome;
            console.log(dados);

            collection.find({nome:{$eq:nome}}).toArray(function(err, result){
                
                if(!result[0] == 0){
                    if(result[0].nome == dados.nome){
                        var formData = [];

                        var status = "falha";

                        formData.status = status;

                        
                        console.log("ta aqui errado")
                        res.json(formData.status);
                        
                        mongoclient.close(); 
                        
                    }
                     
                        
                }else {    
                    var senha_criptografada = crypto.createHash("md5").update(dados.senha).digest("hex");

                    dados.senha =  senha_criptografada;

                    collection.insert(dados);

                        var formData = [];

                        var status = "sucesso";
                        console.log("ta aqui certo")
                        formData.status = status;
                     
                        res.json(formData.status);
                    
                    mongoclient.close();
                }
            });
        });
    });
}

EmpressaDAO.prototype.updateEmpressa = function(dados,res, req){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection('empressa', function(err,  collection){
            collection.update({}, function(err, result){
                if(err){
                    res.json(err);
                } else {
                    res.json(results);
                }
                mongoclient.close();       
            });
        });
    });
}


EmpressaDAO.prototype.getOnlyEmpressa = function(dados,res, req){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection('empressa', function(err,  collection){
            var nome = dados.nome;
            collection.find({nome:{$eq: nome}}).toArray( function(err, results){
                if(!results[0] == 0){
                    if(results[0].nome == nome){
                        console.log(results[0].nome);
                        res.json(results[0].nome);
                    }
                }else{
                    var formData = [];

                    var status = "falha";
 
                    formData.status = status;
                     
                     res.json(formData.status);

                }
                
                mongoclient.close();
            });
        });
    });
}



module.exports = function(){
    return EmpressaDAO;
}