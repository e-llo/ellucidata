Date.prototype.getWeek = function () {
  var dt = new Date(this.getFullYear(), 0, 1);
  return Math.ceil(((this - dt) / 86400000 + dt.getDay() + 1) / 7);
};

const getListaPrecos = (supermercado, produto) => {
  return dados
    .map((dia) =>
      Number(
        dia.supermercados[supermercado]?.find(
          (item) => item.produto === produto
        )?.preco
      )
    )
    .filter((dia) => dia); // eliminar os precos undefined
};

function getMax(supermercado, produto) {
  const precos = getListaPrecos(supermercado, produto);
  var max = Math.max(...precos);
  return "R$ " + max.toFixed(2).toString().replace(".", ",");
}
function getMin(supermercado, produto) {
  // função puxa o valor mínimo do produto no supermercado no mês
  const precos = getListaPrecos(supermercado, produto);
  const min = Math.min(...precos);
  return "R$ " + min.toFixed(2).replace(".", ",");
}

function maxMinSemanais(produto, supermercado) {
  // retorna porcentagem de variação máxima e mínima dentro da semana

  const lista = getListaPrecos(supermercado, produto);

  var valoresSemanais = [];
  var j = 0;
  while (j < lista.length) {
    if (lista.length >= j + 7) {
      var listaSemanalAux = [];
      for (var i = j; i < j + 7; i++) {
        if (Number.isNaN(lista[i])) {
        } else {
          listaSemanalAux.push(lista[i]);
        }
      }
      var variacaoPercent =
        (Math.max(...listaSemanalAux) - Math.min(...listaSemanalAux)) /
        Math.min(...listaSemanalAux);
      valoresSemanais.push((variacaoPercent * 100).toFixed(1));
      j = j + 7;
    } else {
      j = lista.length;
    }
  }
  return valoresSemanais;
}

function getValorAtual(supermercado, produto) {
  const precoAtual = dados[dados.length - 1].supermercados[supermercado]?.find(
    (item) => item.produto === produto
  )?.preco;

  if (!precoAtual || Number.isNaN(precoAtual)) {
    return 0; // não teve inserção no último dia
  }
  return Number(precoAtual);
}

function criaListaMediaMercado() {
  // Calculo para ordenar os supermercados do mais barato ao mais caro
  let listaProdutos = criaListaMediaProduto();
  let rank = Object.keys(dados[dados.length - 1].supermercados)
    .map((nome_mercado) => {
      return {
        supermercado: nome_mercado,
        variacoes: dados[dados.length - 1].supermercados[nome_mercado]
          .map(
            (produto) =>
              produto.preco /
              listaProdutos.filter(
                (prodLista) => prodLista.produto == produto.produto
              )[0].media
          )
          .map((variacao) => Math.round(variacao * 100) - 100),
      };
    })
    .map((supermercado) => {
      return {
        ...supermercado,
        variacaoMedia:
          supermercado.variacoes.reduce((acc, num) => (acc += num), 0) /
          supermercado.variacoes.length,
      };
    })
    .sort(
      (mercadoa, mercadob) => mercadoa.variacaoMedia - mercadob.variacaoMedia
    );

  return rank;
}

function criaListaMediaProduto() {
  // Calculo para ordenar os produtos do mais barato ao mais caro
  const rank = Object.keys(dados[dados.length - 1].itens)
    .map((nome_produto) => {
      const precos = dados[dados.length - 1].itens[nome_produto].map(
        (produto) => produto.preco
      );
      return {
        produto: nome_produto,
        precos,
        media:
          Math.round(
            (precos.reduce((acc, num) => (acc += num), 0) / precos.length) * 100
          ) / 100,
      };
    })
    .sort((produtoa, produtob) => produtoa.media - produtob.media);

  return rank;
}

function comparaMediaProduto(produto, mercado) {
  // lista de preços do produto por mercado
  const media = criaListaMediaProduto().find(
    (prod) => prod.produto == produto
  )?.media;

  if (!media) return 0;
  const valorAtual = getValorAtual(mercado, produto);

  // comparação do valor atual com a média geral
  return Math.round(((valorAtual - media) / media) * 100);
}

function hoverAtual() {
  document.querySelector("#mediaAtual").classList.remove("d-none");
  document.querySelector("#valorAtual").classList.add("d-none");
}

function mouseOutAtual() {
  document.querySelector("#mediaAtual").classList.add("d-none");
  document.querySelector("#valorAtual").classList.remove("d-none");
}

//-------------------------------------------------------------------------------------
//-                                VARIACAO POR PRODUTO
//-------------------------------------------------------------------------------------
function variacaoSemanalProduto(semana, index) {
  // retorna a variação semanal em porcentagem
  // recebe uma lista de dias
  /* [
        [{data: "...", supermercado: "...", preco: ...}, {data...}], - dia1
        [{data: "...", supermercado: "...", preco: ...}, {data...}], - dia2
       ]
    */

  let nomes_mercados = new Set(
    semana.flatMap((dia) => dia).map((produto) => produto.supermercado)
  );
  let listaSemanal, variacao, percentual;
  let valoresSemanais = { semana: index };
  for (mercado of nomes_mercados) {
    listaSemanal = semana
      .map((dia) => dia.filter((produto) => produto.supermercado == mercado))
      .filter((dia) => dia.length != 0)
      .map((dia) => dia[0]);
    variacao =
      listaSemanal[listaSemanal.length - 1].preco - listaSemanal[0].preco;
    percentual = variacao / listaSemanal[0].preco;
    valoresSemanais[mercado] = Math.round(percentual * 100);
  }

  return valoresSemanais;
}

function variacaoSemanalTodosProduto(produto) {
  // retorna a variação semanal em porcentagem

  let dadosProduto = dados
    .filter((dia) => dia.itens[produto])
    .map((dia) =>
      dia.itens[produto].map((obj) => {
        return {
          data: dia.data,
          supermercado: conversorMercado(obj.supermercado).banco,
          preco: obj.preco,
        };
      })
    );
  console.log(dadosProduto);

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
  let semanas = [];

  // Varre a lista de produtos
  for (dia of dadosProduto) {
    // Pega a data do primeiro dia, checa o dia da semana
    let dia_semana = new Date(dia[0].data).getDay(); // domingo: 0, segunda: 1, ... sabado: 7

    // Se a lista estiver vazia ou for domingo, cria uma nova semana dentro da lista de semanas
    if (semanas.length == 0 || dia_semana == 0) {
      semanas.push([dia]);
    } else {
      // Insere o dia na ultima semana existente
      semanas[semanas.length - 1].push(dia);
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
  let varSemanas = semanas.map((semana, index) =>
    variacaoSemanalProduto(semana, index)
  );

  return varSemanas;
}

//-------------------------------------------------------------------------------------
//-                                VARIACAO POR MERCADO
//-------------------------------------------------------------------------------------
function variacaoSemanalMercado(semana, index) {
  // retorna a variação semanal em porcentagem
  // recebe uma lista de dias
  /* [
        [{data: "...", produto: "...", preco: ...}, {data...}], - dia1
        [{data: "...", produto: "...", preco: ...}, {data...}], - dia2
       ]
    */

  const nomes_produtos = new Set(
    semana
      .flat()
      .map((item) => item?.produto)
      .filter((obj) => obj)
  );
  const valoresSemanais = { semana: index };
  for (produto of nomes_produtos) {
    const precosSemana = semana
      .map((dia) => dia.find((item) => item.produto === produto)?.preco)
      .filter((obj) => obj);

    if (!precosSemana.length) continue;

    const variacao = precosSemana[precosSemana.length - 1] - precosSemana[0];
    const percentual = variacao / precosSemana[0];
    valoresSemanais[produto] = Math.round(percentual * 100);
  }

  return valoresSemanais;
}

function variacaoSemanalTodosMercado(mercado) {
  // retorna a variação semanal em porcentagem

  const dadosMercado = dados
    .filter((dia) => dia.supermercados[mercado]?.length)
    .map((dia) =>
      dia.supermercados[mercado].map((obj) => {
        return {
          data: new Date(dia.data),
          produto: conversorProduto(obj.produto).banco,
          preco: obj.preco,
        };
      })
    );

  let semanas = [];

  for (dia of dadosMercado) {
    // Pega a data do dia, e checa qual eh a semana comparando com 01/jan
    let semana = dia[0].data.getWeek(); // 01/jan: 1, 08/jan: 2, ... 02/mar: 10

    // Se a lista estiver vazia ou for domingo, cria uma nova semana dentro da lista de semanas
    if (
      !semanas.length ||
      semana !== semanas[semanas.length - 1][0][0].data.getWeek()
    ) {
      semanas.push([dia]);
    } else {
      // Insere o dia na ultima semana existente
      semanas[semanas.length - 1].push(dia);
    }
  }
  // Chamar o calculo de variacao de semana para cada semana
  const varSemanas = semanas.map((semana, index) =>
    variacaoSemanalMercado(semana, index)
  );

  return varSemanas;
}
