/*------------------------------------------------------------------------------
  -                  Metodos para checar os dados disponiveis         
/*-----------------------------------------------------------------------------*/

let lista = dados.flatMap(dia => dia.itens.sabonete)
let nomes = [...new Set(lista.map(produto => produto.descricao))] // lista da descricao de todos os produtos (sem repeticao)
let contador = {}
// contagem de produtos referentes a cada nome
lista.forEach(produto => contador[produto.descricao] == undefined ? contador[produto.descricao] = 1 : contador[produto.descricao] += 1)

let regex = /MINHA REGEXP/gi
// verificar em quais nomes a RegExp funciona
nomes.map(nome => { return {nome, r: nome.toString().match(regex)} })

// retorna os precos referentes a cada nome de produto (sem repeticao)
let c_prec = {}
lista.forEach(produto => produto.descricao == "0" ? "": c_prec[produto.descricao] == undefined ? c_prec[produto.descricao] = new Set([produto.preco]) : c_prec[produto.descricao].add(produto.preco))