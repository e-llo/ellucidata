import sys
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

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
	EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'div[class="sc-jSgupP styles__Root-sc-1ltite1-0 cHuVIX gstWgI"]'))
)

dados = []

for secao in secaoSupermercados:
	dados.append({
		'supermercado': secao.get_attribute('span')
	})

print(dados)
driver.close()
