import sys
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

lista_produtos = [
	'Arroz Branco Prato Fino Tipo 1 - 5kg',
	'Extrato de Tom Elefante Lata 130g',
	'Açúcar Refinado União 1 kg',
	'Feijão Preto Camil - 1Kg',
	'Óleo de Soja Tipo 1 Liza Garrafa 900ml',
	'Manteiga com Sal Aviação 200g',
	'Pão de Forma Pullman - 480g',
	'Café Melitta Tradicional Vácuo 500g',
	'Fubá Mimoso Yoki Pacote 500g',
	'Leite Condensado MOÇA Lata 395g',
	'Macarrão com Ovos Espaguete 8 Barilla Pacote 500g',
	'Creme Dental Menta Original Colgate Tripla Ação Caixa 90g',
	'Sabonete em Barra Antibacteriano Protex Cartucho 85g', 
	'Sal Refinado Cisne - 1kg',
	'Papel Higiênico NEVE Toque de Seda - 4 Rolos'
]


def extraiProduto(produto):
	try:
		subsecao = produto.find_element_by_xpath('div[2]')
		preco = subsecao.find_element_by_css_selector('div[font-size="extraSmall"]').text
		descricao = subsecao.find_element_by_css_selector('div[display="-webkit-box"]').text
		fabricante = subsecao.find_element_by_css_selector('div[font-size="tiny"]').text
	except:
		return [0, 0, 0]
	return [descricao, fabricante, preco]


def scraping(nome_produto):	
	time.sleep(2)

	#barra de busca da segunda página
	inputItem = WebDriverWait(driver, 20).until(
		EC.presence_of_element_located((By.CSS_SELECTOR, 'input.sc-bkzZxe'))
	)

	inputItem.send_keys(nome_produto)
	inputItem.send_keys(Keys.RETURN)

	secaoSupermercados = WebDriverWait(driver, 20).until(
		EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'div.sc-jSgupP.styles__Root-sc-1ltite1-0'))
	)

	dados = []
	i=0
	for secao in secaoSupermercados:
		## verificar aqui se o mercado da seção tá na lista de mercados que vamos analisar
		produto = extraiProduto(secao)
		dados.append({
			'supermercado': secao.find_element_by_xpath('div[1]/div[1]').text,
			'descricao': produto[0],
			'fabricante': produto[1],
			'preco': produto[2],
		})
		i+=1
	driver.get('https://www.supermercadonow.com/mercados') 
	print(dados)
	return dados


# criando driver geral
driver = webdriver.Chrome()
driver.get('https://www.supermercadonow.com/')


# localizando barra de busca da primeira página
inputCEP = WebDriverWait(driver, 20).until(
	EC.presence_of_element_located((By.CSS_SELECTOR, 'input.sc-bkzZxe'))
)
# entrando com o cep para encontrar supermercados
inputCEP.send_keys('04564906')
inputCEP.send_keys(Keys.RETURN)

resumo_dados = [] # reúne todos os dados de todos os produtos em todos os supermercados

# chamo a função de pesquisa e scraping dos dados
for i in lista_produtos:
	resumo_dados.append(scraping(i))	
print(resumo_dados)

driver.close()



