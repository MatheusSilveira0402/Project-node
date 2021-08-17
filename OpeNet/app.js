/* importa as cofigurações do servidor */
var app = require('./config/server');

/* Parametrizar a porta de escuta */

var server = app.listen(8001, function(){
    console.log('Servidor online');
})

var io = require('socket.io').listen(server);


app.set('io', io);
/* criar a conexão por websocket */
io.on('connection', function(socket){
    console.log('usuário conectou');

    socket.on('disconnect', function(){
        console.log('Usuário desconectou');
    })
    /* Funções para os dialogos*/
    socket.on('msgParaServidor', function(data){
        socket.emit(
            'msgParaClient',
            {apelido: data.apelido, mensagem : data.mensagem}
        );

        socket.broadcast.emit(
            'msgParaClient',
            {apelido: data.apelido, mensagem : data.mensagem}
        );

        /* Funções para alteração dos participantes */
        if(parseInt(data.apelido_atualizado) == 0){   
            socket.emit(
                'participantesParaClient',
                {apelido: data.apelido}
            );
    
            socket.broadcast.emit(
                'participantesParaClient',
                {apelido: data.apelido}
            );
        }
    });
});
