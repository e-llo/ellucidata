import sys
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def extraiProduto(produto):
	preco = produto.find_element_by_css_selector('div.sc-eCssSg.bcHdwl').text
	descricao = produto.find_element_by_css_selector('div.sc-eCssSg.edSRJP').text
	fabricante = produto.find_element_by_css_selector('div.sc-eCssSg.gVkgMB').text
	return [descricao, fabricante, preco]


driver = webdriver.Chrome()
driver.get('https://www.supermercadonow.com/')

# localizando barra de busca da primeira página
inputCEP = WebDriverWait(driver, 20).until(
	EC.presence_of_element_located((By.CSS_SELECTOR, 'input.sc-bkzZxe'))
)
# entrando com o cep para encontrar supermercados
inputCEP.send_keys('04564906')
inputCEP.send_keys(Keys.RETURN)

time.sleep(2)

#barra de busca da segunda página
inputItem = WebDriverWait(driver, 20).until(
	EC.presence_of_element_located((By.CSS_SELECTOR, 'input.sc-bkzZxe'))
)

inputItem.send_keys('Arroz')
inputItem.send_keys(Keys.RETURN)




secaoSupermercados = WebDriverWait(driver, 20).until(
	EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'div.sc-jSgupP.styles__Root-sc-1ltite1-0.cHuVIX.gstWgI'))
)
lista_nomes = driver.find_elements_by_css_selector('div.sc-eCssSg.inyvdf.styles__Name-sc-1ltite1-4.doNrdT')


dados = []
i=0
for secao in secaoSupermercados:
	produto = extraiProduto(secao)
	dados.append({
		'supermercado': lista_nomes[i].text,
		'descricao': produto[0],
		'fabricante': produto[1],
		'preco': produto[2],
	})
	i+=1
print(dados)
driver.close()



