var readline = require('readline');
var distancia;

var leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

leitor.question("Qual distancia?\n", function(answer) {
    
    let x = 0;
    let d = 1;
    var distancia = answer;
    console.log("\n" +  distancia + " \n percorrendo!! \n");
    leitor.close();

    passos(x, distancia, d);
});




function passos(x, distancia, d){
    for(;x <= distancia;){

        x = x + d;
        console.log(x);
    }
   
}


