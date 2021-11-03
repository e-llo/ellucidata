import unicodedata

def extract_markets(itens):
    supermercados = dict()
    ## vasculhar cada key do objeto itens
    for nome_produto in itens.keys():
    ## adicionar os produtos na lista de mercados de acordo com o nome do mercado
        for produto in itens[nome_produto]:
            ### montar cada item da lista
            resultado_produto = {
                'produto': nome_produto,
                'descricao': produto["descricao"],
                'fabricante': produto["fabricante"],
                'preco': produto["preco"]
            }
            
            ### Formatar o nome do supermercado
            nome_mercado = unicodedata.normalize("NFD", produto["supermercado"].lower().replace(" ", "_"))\
                .encode("ascii", "ignore")\
                .decode("utf-8")

            ### Se o supermercado ainda nao foi adicionado ao dicionario,
            ### inicializa-lo
            if not nome_mercado in supermercados.keys():
                supermercados[nome_mercado] = list()
            
            ### Dar append do item na lista do supermercado
            supermercados[nome_mercado].append(resultado_produto)
    
    return supermercados