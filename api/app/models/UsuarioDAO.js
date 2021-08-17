const crypto = require("crypto");



/* Aqui vai ter funções que se conectaram com banco de dados*/
function UsuarioDAO(connection){
    this._connection = connection();
    
}


UsuarioDAO.prototype.listarUsuario = function(res, req){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection('usuario', function(err,  collection){
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

UsuarioDAO.prototype.inserirUsuario = function(dados, res, req){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection('usuario', function(err,  collection){
            var user = dados.usuario;
            collection.find({usuario:{$eq:user}}).toArray(function(err, result){
                
                if(!result[0] == 0){
                    if(result[0].usuario == dados.usuario){
                        var formData = [];

                        var status = "falha";

                        formData.status = status;
                        console.log("to aqui errado");
                        
                        res.json(formData.status);
                        
                        mongoclient.close(); 
                        
                    }
                     
                        
                }else {    
                    var senha_criptografada = crypto.createHash("md5").update(dados.senha).digest("hex");

                    dados.senha =  senha_criptografada;
                    console.log("to aqui certo");
                    collection.insert(dados);

                        var formData = [];

                        var status = "sucesso";

                        formData.status = status;
                     
                        res.json(formData.status);
                    
                    mongoclient.close();
                }
            });
        });
    });
}

UsuarioDAO.prototype.updateUsuario = function(dados, res, req){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection('usuario', function(err,  collection){
            collection.update({ava: 1, usuario:{$eq: user}}, {$set: {ava: 0}}, function(err, result){
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


UsuarioDAO.prototype.autenticarUsuario = function(dados,res, req){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection('empressa', function(err,  collection){ 
            
            var user = dados.usuario;
            
            var senha_criptografada = crypto.createHash("md5").update(dados.senha).digest("hex");

            dados.senha =  senha_criptografada;
            
            var senha = dados.senha
            collection.find({usuario:{$eq: user}, senha:{$eq: senha}}).toArray( function(err, results){
                if(!results[0] == 0){
                    if(results[0].usuario == user){
                    
                    var formData = [];

                    var status = "sucesso";
                    console.log("estou aqui collection empressa");
                    

                    formData.status = status;
                    
                    res.json(formData.status);

                    }

                } else {
                    mongoclient.collection('usuario', function(err,  collection){
                        var user = dados.usuario;
            
                        dados.senha =  senha_criptografada;
                        
                        var senha = dados.senha;
                        
                        
                        collection.find({usuario:{$eq: user}, senha:{$eq: senha}}).toArray( function(err, results){
                            
                            if(!results[0] == 0){
                                if(results[0].usuario == user){
                                
                                var formData = [];
            
                                var status = "sucesso";
            
                                
            
                                formData.status = status;
                                
                                res.json(formData.status);
            
                                }
            
                            } else {
                                var formData = [];
            
                                
            
                                var status = "falha";
            
                                formData.status = status;
                                
                                res.json(formData.status);
                            }
                            mongoclient.close();
                        });
                    });
                }
            mongoclient.close();
            });
        });     
    });
}


UsuarioDAO.prototype.getOnlyUsuario = function(dados,res, req){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection('usuario', function(err,  collection){
            var user = dados.usuario;
            var senha = dados.senha;
            collection.find({usuario:{$eq: user}}).toArray( function(err, results){
                if(!results[0] == 0){
                    if(results[0].usuario == user){
                        console.log(results[0].usuario);
                        res.json(results[0].usuario);
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
    return UsuarioDAO;
}