from dotenv import load_dotenv
import unicodedata
import os
import pymongo
import certifi

load_dotenv()

# Criar conexao com o banco de dados
client = pymongo.MongoClient(os.environ.get("DB_URL"),  tlsCAFile=certifi.where())
# Criar/accesar o banco chamado "ellucidata"
db = client["ellucidata"]
# Criar/acessar a colecao dos dias
colecao = db["dias"]

# Selecionar todos os dados do banco e salvar em uma variavel
dados = colecao.find({})


# Inspecionar cada dia
for dia in dados:
    # Se o dia ja possuir o campo "supermercados", pula para o proximo dia
    if "supermercados" in dia.keys():
        continue

    # Criar uma variavel para armazenar a lista de mercados
    supermercados = dict()
    ## vasculhar cada key do objeto itens
    for lista_produto in dia["itens"].keys():
    ## adicionar os produtos na lista de mercados de acordo com o nome do mercado
        for produto in dia["itens"][lista_produto]:
            ### montar cada item da lista
            resultado_produto = {
                'produto': lista_produto,
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
    
    # Dar update nos dados do banco inserindo o novo objeto "supermercados"
    colecao.update_one(
        {"_id": dia["_id"]}, # query
        {"$set": {"supermercados": supermercados}} # novos valores
    )


print("Update bem sucedido.")
# Fechar conexao com o banco de dados
client.close()