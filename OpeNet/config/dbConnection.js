var mongo = require('mongodb')


var connMongoDb = function(){
  console.log('entrou aqui')
  var db = new mongo.Db(
    'chat',
    new mongo.Server(
       'localhost',
       27017,
       {}
    ),
    {}
  );
  return db;

}
module.exports = function(){
  return connMongoDb;
}