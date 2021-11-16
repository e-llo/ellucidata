

function getMax(supermercado, produto){

    let lista = dados.flatMap(dia => 
        parseFloat(dia.supermercados[supermercado] != undefined ? dia.supermercados[supermercado]
            .filter(prod => prod.produto == produto)
            .map(prod=> prod.preco) :  null)
    )
    // removing NaN from the list
    var i = 0;
    while (i < lista.length) {
        if (Number.isNaN(lista[i])) {
        lista.splice(i, 1);
        } else {
        ++i;
        }
    }

    var max = Math.max(...lista);
    return 'R$ '+max.toFixed(2).toString().replace(".", ",")
   
}
function getMin(supermercado,produto){
    // função puxa o valor mínimo do produto no supermercado no mês
    let lista = dados.flatMap(dia => 
        parseFloat(dia.supermercados[supermercado] != undefined ? dia.supermercados[supermercado]
            .filter(prod => prod.produto != undefined && prod.produto == produto)
            .map(prod=> prod.preco.toString()
            .replace("R$ ", "")
            .replace(",",".")) :  null)
    )
    
    var i = 0;
    while (i < lista.length) {
        if (Number.isNaN(lista[i])) {
            lista.splice(i, 1);
        } else {
            ++i;
        }
    }

    var min = Math.min(...lista);
    return 'R$ '+min.toFixed(2).toString().replace(".", ",")
}



// function variacaoSemanal(produto, supermercado){
    
//     let lista = dados.flatMap(dia => 
//         parseFloat(dia.supermercados[supermercado] != undefined ? dia.supermercados[supermercado]
//             .filter(prod => prod.produto != undefined && prod.produto == produto)
//             .map(prod=> prod.preco.toString()
//             .replace("R$ ", "")
//             .replace(",",".")) :  null)
//     )
    
//     var i = 0;
//     valoresSemanais = []
    
//     while (i < lista.length) {
//         if (Number.isNaN(lista[i])) {
//         lista.splice(i, 1);
//         } else {
//         ++i;
//         }
//     }

//     for(i=0; i<lista.length; i=i+6){

//         variacao = lista[i+6] - lista[i]

//     }
// }