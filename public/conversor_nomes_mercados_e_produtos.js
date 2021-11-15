// Padrao do banco, sem acento, com acento
const nomes_mercados = [
    ["extra_hiper","Extra Hiper"],
	["big","Big"],
	["pao_de_acucar","Pao De Acucar", "Pão de Açúcar"],
	["mercado_extra","Mercado Extra"],
	["akki_atacadista","Akki Atacadista", "Akkí Atacadista"],
	["hirota_supermercados","Hirota Supermercados"],
	["quitanda","Quitanda"],
	["master_supermercados","Master Supermercados"],
	["natural_da_terra","Natural Da Terra","Natural da Terra"],
	["emporium_sao_paulo","Emporium Sao Paulo","Emporium São Paulo"],
	["sams_club","Sams Club"],
	["emporio_nestle","Emporio Nestle","Empório Nestlé"],
	["emporio_hortisabor","Emporio Hortisabor", "Empório Hortisabor"],
    ["americanas_mercado", "Americanas Mercado"],
    ["local_americanas", "Local Americanas"],
]

// Padrao do banco, final
const nomes_produtos = [
    ['arroz','Arroz Branco'],
    ['extrato_tomate','Extrato de Tomate'],
    ['acucar', 'Açúcar Refinado'],
    ['oleo_soja', 'Óleo de Soja'],
    ['manteiga','Manteiga'],
    ['pao','Pão de Forma'],
    ['cafe','Café'],
    ['fuba','Fubá Mimoso'],
    ['leite_condensado','Leite Condensado'],
    ['macarrao','Macarrão Espaguete'],
    ['creme_dental','Creme Dental'],
    ['sabonete','Sabonete em Barra'],
    ['sal','Sal Refinado'],
    ['feijao','Feijão'],
    ['papel_higienico','Papel Higiênico'],
]

function conversorMercado(mercado) {
    const linha_mercado = nomes_mercados.filter(linha => linha.includes(mercado)).flatMap(linha => linha)

    if (linha_mercado.length == 0) {
        return {banco: mercado, tela:mercado}
    }

    return {banco:linha_mercado[0], tela:linha_mercado[linha_mercado.length - 1]}
}

function conversorProduto(produto) {
    const linha_produto = nomes_produtos.filter(linha => linha.includes(produto)).flatMap(linha => linha)

    if (linha_produto.length == 0) {
        return {banco: produto, tela:produto}
    }

    return {banco:linha_produto[0], tela:linha_produto[linha_produto.length - 1]}
}