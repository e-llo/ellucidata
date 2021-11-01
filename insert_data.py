from datetime import datetime
from dotenv import load_dotenv
import os
import scraper
import pymongo
import certifi

load_dotenv() # inicializar variaveis de ambiente .env

lista_produtos = [
	['arroz', 'Arroz Branco Prato Fino Tipo 1 - 5kg'],
	['extrato_tomate', 'Extrato de Tom Elefante Lata 130g'],
	['acucar', 'Açúcar Refinado União 1 kg'],
	['feijao', 'Feijão Preto Camil - 1Kg'],
	['oleo_soja', 'Óleo de Soja Tipo 1 Liza Garrafa 900ml'],
	['manteiga', 'Manteiga com Sal Aviação 200g'],
	['pao', 'Pão de Forma Pullman - 480g'],
	['cafe', 'Café Melitta Tradicional Vácuo 500g'],
	['fuba', 'Fubá Mimoso Yoki Pacote 500g'],
	['leite_condensado', 'Leite Condensado MOÇA Lata 395g'],
	['macarrao', 'Macarrão com Ovos Espaguete 8 Barilla Pacote 500g'],
	['creme_dental', 'Creme Dental Menta Original Colgate Tripla Ação Caixa 90g'],
	['sabonete', 'Sabonete em Barra Antibacteriano Protex Cartucho 85g'], 
	['sal', 'Sal Refinado Cisne - 1kg'],
	['papel_higienico', 'Papel Higiênico NEVE Toque de Seda - 4 Rolos']
]

if __name__ == "__main__":
	itens = {} # reúne todos os dados de todos os produtos em todos os supermercados

	for item in lista_produtos:
		# Cria um atributo com o nome da primeira string do array como rotulo no dicionario "itens"
		# e insere o resultado do metodo scraping usando a segunda string como parametro
		itens[item[0]] = scraper.scraping(item[1])
		print(item[0], "=>", itens[item[0]])
		print("--------------------------------------------------")

	# Formata os dados coletados
	dados_formatados = {
		"data" : datetime.now(),
		"itens" : itens
	}

	scraper.driver.close()


	# Criar conexao com o banco de dados
	client = pymongo.MongoClient(os.environ.get("DB_URL"),  tlsCAFile=certifi.where())
	# Criar/accesar o banco chamado "ellucidata"
	db = client["ellucidata"]
	# Criar/acessar a colecao dos dias
	colecao = db["dias"]

	# Insere os dados formatados no banco de dados
	colecao.insert_one(dados_formatados)

	print("Inserção bem sucedida.")
	client.close()