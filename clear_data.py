from dotenv import load_dotenv
from insert_data import lista_produtos
import os
import pymongo
import certifi
import re

load_dotenv()

# Criar conexao com o banco de dados
client = pymongo.MongoClient(os.environ.get("DB_URL"),  tlsCAFile=certifi.where())
# Criar/accesar o banco chamado "ellucidata"
db = client["ellucidata"]
# Criar/acessar a colecao dos dias
colecao = db["dias"]

# Selecionar todos os dados do banco e salvar em uma variavel
dados = colecao.find({})

# dentro de cada dia, vai entrar no dicionario de itens e avaliar um por um
for dia in dados:
    for nome_prod in dia["itens"].keys():
        # Encontrar a regex referente ao produto por meio da lista de produtos
        linha_produto = list(
            filter(lambda linha: linha[0] == nome_prod, lista_produtos)
        )
        regex = linha_produto[0][2]

        lista_final = list(
        filter(lambda item: re.search(regex, str(item["descricao"]), flags=re.IGNORECASE), dia["itens"][nome_prod])
        )
        # transformar preco dos produtos em float
        for produto in lista_final:
            produto['preco'] = float(produto['preco'].replace("R$ ","").replace(",", "."))

        #print(lista_final, " tamanho:",len(lista_final))
        dia["itens"][nome_prod] = lista_final

    colecao.update_one(
        {"_id": dia["_id"]}, # query
        {"$set": {"itens": dia["itens"]}} # novos valores
    )
    print("update concluido dia", dia['data'].day,"do", dia["data"].month)

print("Limpeza bem sucedida.")
# Fechar conexao com o banco de dados
client.close()