from dotenv import load_dotenv
from utils.util import extract_markets
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
    supermercados = extract_markets(dia["itens"])
    
    
    # Dar update nos dados do banco inserindo o novo objeto "supermercados"
    colecao.update_one(
        {"_id": dia["_id"]}, # query
        {"$set": {"supermercados": supermercados}} # novos valores
    )
    print("update concluido dia", dia['data'].day,"do", dia["data"].month)


print("Update bem sucedido.")
# Fechar conexao com o banco de dados
client.close()