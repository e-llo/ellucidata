from datetime import datetime
from dotenv import load_dotenv
from utils.util import extract_markets
import os
import scraper
import pymongo
import certifi

load_dotenv() # inicializar variaveis de ambiente .env

# Nome da chave no banco, Pesquisa no site, RegExp
lista_produtos = [
	['arroz', 'Arroz Branco Prato Fino Tipo 1 - 5kg', r"arroz branco prato fino"],
	['extrato_tomate', 'Extrato de Tom Elefante Lata 130g', r"Extrato (de )?Tom(ate)? [\s\S]*elefante lata [\s\S]*130g"],
	['acucar', 'Açúcar Refinado União 1 kg', r"Açúcar refinado união (vintage[\s\S]*)?1\s?kg"],
	['feijao', 'Feijão Preto Camil - 1Kg', r"feijão preto camil - 1Kg"],
	['oleo_soja', 'Óleo de Soja Tipo 1 Liza Garrafa 900ml', r"Óleo de Soja Tipo 1 Liza Garrafa 900ml"],
	['manteiga', 'Manteiga com Sal Aviação 200g', r"Manteiga com Sal Aviação (lata|pote)?\s?200g"],
	['pao', 'Pão de Forma Pullman - 480g', r"Pão de forma (tradicional )?pullman"],
	['cafe', 'Café Melitta Tradicional Vácuo 500g', r"Café Melitta (sabor da fazenda )?Tradicional (pouch|vácuo)?\s?500g"],
	['fuba', 'Fubá Mimoso Yoki Pacote 500g', r"Fubá Mimoso Yoki Pacote 500g"],
	['leite_condensado', 'Leite Condensado MOÇA Lata 395g', r"Leite Condensado MOÇA Lata 395g"],
	['macarrao', 'Macarrão com Ovos Espaguete 8 Barilla Pacote 500g', r"Macarrão com Ovos Espaguete 8 Barilla Pacote 500g"],
	['creme_dental', 'Creme Dental Menta Original Colgate Tripla Ação Caixa 90g', r"Creme Dental Menta Original Colgate Tripla Ação Caixa 90g"],
	['sabonete', 'Sabonete em Barra Antibacteriano Protex Cartucho 85g', r"Sabonete em Barra Antibacteriano [\s\S]*Protex[\s\S]* Cartucho (85|90)g"], 
	['sal', 'Sal Refinado Cisne - 1kg', r"Sal Refinado Cisne - 1kg"],
	['papel_higienico', 'Papel Higiênico NEVE Toque de Seda - 4 Rolos', r"Papel Higiênico NEVE (supreme|toque de seda) - 4 rolos"]
]

# Nome da chave no banco, Url no site
mercados = [
	["extra_hiper","extra-hiper-interlagos"],
	["big","hipermercado-big-indianopolis"],
	["pao_de_acucar","pao-de-acucar-real-parque"],
	["mercado_extra","mercado-extra-americo-brasiliense"],
	["akki_atacadista","akki-atacadista-joao-dias"],
	["hirota_supermercados","supermercado-hirota-campo-belo"],
	["quitanda","quitanda"],
	["master_supermercados","master-supermercados-vila-mariana"],
	["natural_da_terra","natural-da-terra-brooklin"],
	["emporium_sao_paulo","emporium-sao-paulo-vila-nova-afonso-braz"],
	["sams_club","hipermercado-sams-club-morumbi"],
	["emporio_nestle","loja-nestle-chucri-zaidan"],
	["emporio_hortisabor","emporio-hortisabor-itaim"],
]

if __name__ == "__main__":
	itens = {} # reúne todos os dados de todos os produtos em todos os supermercados
	supermercados = {}
	nomes_produtos = list(map(lambda list_prod: list_prod[0], lista_produtos))

	# Inicializar as listas
	for nome in nomes_produtos:
		itens[nome] = list()

	for mercado in mercados:
		itens_supermercados = scraper.scraping(list_mercado=mercado, list_produtos=lista_produtos)
		print(mercado[0], "=>", itens_supermercados["itens"])
		supermercados[mercado[0]] = itens_supermercados["supermercado"]
		
		for nome_prod, valor in itens_supermercados["itens"].items():
			itens[nome_prod].append(valor)

	## Retorna um dicionario {
	# "supermercado":[{},{}],
	# "itens": {
	# 		"arroz": [{}],
	#		"feijao": [{}]
	# 	}
	# }

	# Formata os dados coletados
	dados_formatados = {
		"data" : datetime.now(),
		"itens" : itens,
		"supermercados": supermercados
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