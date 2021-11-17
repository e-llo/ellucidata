

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



function variacaoSemanal(produto, supermercado){
    
    let lista = dados.flatMap(dia => 
        parseFloat(dia.supermercados[supermercado] != undefined ? dia.supermercados[supermercado]
            .filter(prod => prod.produto != undefined && prod.produto == produto)
            .map(prod=> prod.preco.toString()
            .replace("R$ ", "")
            .replace(",",".")) :  null)
    )
    
    // debugger;
    var valoresSemanais = []
    var j = 0
    while(j<lista.length){
        if(lista.length>=j+7){
            var listaSemanalAux = []
            for(var i = j; i<j+7;i++){
                if (Number.isNaN(lista[i])) {
                }else{
                    listaSemanalAux.push(lista[i])
                }
            }
            variacaoPercent = (Math.max(...listaSemanalAux) - Math.min(...listaSemanalAux))/Math.min(...listaSemanalAux)
            valoresSemanais.push((variacaoPercent*100).toFixed(1))
            j = j+7
        }else{
            j = lista.length
        }

    }
    return valoresSemanais
}

