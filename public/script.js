

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



function variacaoSemanal(produto, supermercado){ // retorna a variação semanal em porcentagem
    

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
                    listaSemanalAux.push(0)
                }else{
                    listaSemanalAux.push(lista[i])
                }
            }
            var variacao = listaSemanalAux[6] - listaSemanalAux[0]
            var percentual = variacao/listaSemanalAux[0]
            valoresSemanais.push((percentual*100).toFixed(1))
            j = j+7
        }else{
            j = lista.length
        }

    }
    return valoresSemanais
}

function variacaoSemanalTodos(produto){ // retorna a variação semanal em porcentagem
    

    let dadosProduto = dados.filter(dia => dia.itens[produto] != undefined)
    .map(dia => dia.itens[produto].map(obj => {return {data: dia.data, ...obj}}))

    let dadosFinal = [];
    let listaProdSupermercados = [float][float]
    for(var i = 0; i<dadosProduto.length; i++){ //42 dias
        for(var j = 0; j<dadosProduto[i].length; j++){ //10 supermercados
            listaProdSupermercados[j][i] = dadosProduto[i]["preco"]
        }
    }



    lista[0].mercados
    .map(obj => obj.supermercado) // capturar o nome de cada mercado
    .sort((a, b) => a.supermercado < b.supermercado ? -1:1) // ordem alfabetica
    .forEach(mercado => {

    let dadosMercados = {
        datas: infos.map(mercadoAux => mercadoAux.data), // Datas
        y: infos.map(mercadoAux => mercadoAux["preco"]), // Precos
        name: conversorMercado(mercado).tela
    }

    dadosFinal.push(dadosMercados)        
    })
    
    // debugger;
    var valoresSemanais = []
    var j = 0
    while(j<lista.length){
        if(lista.length>=j+7){
            var listaSemanalAux = []
            for(var i = j; i<j+7;i++){
                if (Number.isNaN(lista[i])) {
                    listaSemanalAux.push(0)
                }else{
                    listaSemanalAux.push(lista[i])
                }
            }
            var variacao = listaSemanalAux[6] - listaSemanalAux[0]
            var percentual = variacao/listaSemanalAux[0]
            valoresSemanais.push((percentual*100).toFixed(1))
            j = j+7
        }else{
            j = lista.length
        }

    }
    return valoresSemanais
}



// let lista = dados.filter(dia => dia.itens[produto] != undefined)
//             .map(dia => {
//             return {
//                 data: dia.data,
//                 produto: produto,
//                 mercados: dia.itens[produto]
//                     .map(prod => {return {data: dia.data, ...prod}}) // Inserir data em cada mercado
//             }
//         })
        
//         let dadosFinal = [];

//         lista[0].mercados
//          .map(obj => obj.supermercado) // capturar o nome de cada mercado
//          .sort((a, b) => a.supermercado < b.supermercado ? -1:1) // ordem alfabetica
//          .forEach(mercado => {
//             let infos = lista
//                 .flatMap(dia => dia.mercados)
//                 .filter(mercadoAux => mercadoAux.supermercado == mercado)
            
//             let dadosMercados = {
//                 datas: infos.map(mercadoAux => mercadoAux.data), // Datas
//                 y: infos.map(mercadoAux => mercadoAux["preco"]), // Precos
//                 name: conversorMercado(mercado).tela
//             }
    
//             dadosFinal.push(dadosMercados)        
//         })