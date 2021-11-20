

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



function maxMinSemanais(produto, supermercado){ // retorna porcentagem de variação máxima e mínima dentro da semana
    
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
            var variacaoPercent = (Math.max(...listaSemanalAux) - Math.min(...listaSemanalAux))/Math.min(...listaSemanalAux)
            valoresSemanais.push((variacaoPercent*100).toFixed(1))
            j = j+7
        }else{
            j = lista.length
        }

    }
    return valoresSemanais
}


function getValorAtual(supermercado, produto){
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

    var atual = lista[lista.length-1];
    return 'R$ '+atual.toFixed(2).toString().replace(".", ",")
   
}



//-------------------------------------------------------------------------------------
//-                                VARIACAO POR PRODUTO
//-------------------------------------------------------------------------------------
function variacaoSemanalProduto(semana, index){ // retorna a variação semanal em porcentagem
    // recebe uma lista de dias
    /* [
        [{data: "...", supermercado: "...", preco: ...}, {data...}], - dia1
        [{data: "...", supermercado: "...", preco: ...}, {data...}], - dia2
       ]
    */
    
    let nomes_mercados = new Set(semana.flatMap(dia => dia).map(produto => produto.supermercado))
    let listaSemanal, variacao, percentual
    let valoresSemanais = {semana: index}
    for(mercado of nomes_mercados) {
        listaSemanal = semana.map(dia => dia.filter(produto => produto.supermercado == mercado)).filter(dia => dia.length != 0).map(dia => dia[0])
        variacao = listaSemanal[listaSemanal.length-1].preco - listaSemanal[0].preco
        percentual = variacao/listaSemanal[0].preco
        valoresSemanais[mercado] = Math.round(percentual*100)
    }

    return valoresSemanais
}

function variacaoSemanalTodosProduto(produto){ // retorna a variação semanal em porcentagem
    
    let dadosProduto = dados.filter(dia => dia.itens[produto] != undefined)
    .map(dia => dia.itens[produto].map(obj => {return {data: dia.data, supermercado: conversorMercado(obj.supermercado).banco, preco: obj.preco}}))

    /* dadosProduto - ESTRUTURA
    [
        [
            {data: ..., supermercado: "...", preco: ...},
            {data: ..., supermercado: "...", preco: ...},
            {data: ..., supermercado: "...", preco: ...},
        ], - dia
        [], - dia
    ]
    */

    // Objetivo: criar uma nova lista para distribuir os dias por semana
    let semanas = []

    // Varre a lista de produtos
    for(dia of dadosProduto) {
        // Pega a data do primeiro dia, checa o dia da semana
        let dia_semana = new Date(dia[0].data).getDay() // domingo: 0, segunda: 1, ... sabado: 7

        // Se a lista estiver vazia ou for domingo, cria uma nova semana dentro da lista de semanas
        if(semanas.length == 0 || dia_semana == 0) {
            semanas.push([dia])
        } else {
            // Insere o dia na ultima semana existente
            semanas[semanas.length-1].push(dia)
        }
    }

    // semanas - ESTRUTURA
    /*[
        [[dia1],[dia2]...], - semana 0
        [[diaX]...], - semana 1
        [...], - semana 2
      ]
    */
    // Chamar o calculo de variacao de semana para cada semana
    let varSemanas = semanas.map((semana, index) => variacaoSemanalProduto(semana, index))
    
    return varSemanas
    
}

//-------------------------------------------------------------------------------------
//-                                VARIACAO POR MERCADO
//-------------------------------------------------------------------------------------
function variacaoSemanalMercado(semana, index){ // retorna a variação semanal em porcentagem
    // recebe uma lista de dias
    /* [
        [{data: "...", supermercado: "...", preco: ...}, {data...}], - dia1
        [{data: "...", supermercado: "...", preco: ...}, {data...}], - dia2
       ]
    */
    
    let nomes_produtos = new Set(semana.flatMap(dia => dia).map(mercado => mercado.produto))
    let listaSemanal, variacao, percentual
    let valoresSemanais = {semana: index}
    for(produto of nomes_produtos) {
        listaSemanal = semana.map(dia => dia.filter(mercado => mercado.produto == produto)).filter(dia => dia.length != 0).map(dia => dia[0])
        variacao = listaSemanal[listaSemanal.length-1].preco - listaSemanal[0].preco
        percentual = variacao/listaSemanal[0].preco
        valoresSemanais[produto] = Math.round(percentual*100)
    }

    return valoresSemanais
}

function variacaoSemanalTodosMercado(mercado){ // retorna a variação semanal em porcentagem
    
    let dadosMercado = dados.filter(dia => dia.supermercados[mercado] != undefined)
    .map(dia => dia.supermercados[mercado].map(obj => {return {data: dia.data, produto: conversorProduto(obj.produto).banco, preco: obj.preco}}))

    
    let semanas = []
    
    for(dia of dadosMercado) {
        // Pega a data do primeiro dia, checa o dia da semana
        let dia_semana = new Date(dia[0].data).getDay() // domingo: 0, segunda: 1, ... sabado: 7

        // Se a lista estiver vazia ou for domingo, cria uma nova semana dentro da lista de semanas
        if(semanas.length == 0 || dia_semana == 0) {
            semanas.push([dia])
        } else {
            // Insere o dia na ultima semana existente
            semanas[semanas.length-1].push(dia)
        }
    }
    // Chamar o calculo de variacao de semana para cada semana
    let varSemanas = semanas.map((semana, index) => variacaoSemanalMercado(semana, index))
    
    return varSemanas
    
}
