var http = require('http');

var opcoes = {
    hostname: 'localhost',
    port: 8000,
    path: '/',
    headers: {
        'Accept' : 'application/json'
    }
}

var buffer_corpo_response = [];

http.get('http://localhost:8000', function(res){
    res.on('data', function(pedaco){
        buffer_corpo_response.push(pedaco);


    });
    res.on('end', function(){
       var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
        console.log(corpo_responde)
    });
});
