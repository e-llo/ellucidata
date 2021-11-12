
function getMax(supermercado, produto){

    let lista = dados.flatMap(dia => 
        parseFloat(dia.supermercados[supermercado]
            .filter(prod => prod.produto == produto)
            .map(prod=> prod.preco.toString()
                .replace("R$ ", "")
                .replace(",",".")))
    )
    var max = Math.max(...lista);
    return max
}
function getMin(produto, supermercado){
    // função puxa o valor mínimo do produto no supermercado no mês
    let lista = dados.flatMap(dia => 
        parseFloat(dia.supermercados[supermercado]
            .filter(prod => prod.produto == produto)
            .map(prod=> prod.preco.toString()
                .replace("R$ ", "")
                .replace(",",".")))
    )
    var max = Math.min(...lista);
    return max
}

function variacaoMensal(produto, supermercado, mes){
    // getMax(produto, supermercado, mes);
}

var array = getMax('extra_hiper', 'arroz')
console.log(array)