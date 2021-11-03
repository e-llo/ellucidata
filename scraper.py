import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


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
	driver.back()
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


