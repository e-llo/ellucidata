import re
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def extraiProduto(texto_produto):
	try:
		lista_infos = texto_produto.split("\n")
		lista_infos = filter(lambda txt: re.search(r"^(?!.* OFF)", txt, flags=re.IGNORECASE),lista_infos)
		lista_infos = list(filter(lambda txt: re.search(r"(R\$[\s\S]*cada)|^[^R\$]", txt, flags=re.IGNORECASE),lista_infos))

		fabricante = lista_infos[0]
		descricao = lista_infos[1]
		preco = float(lista_infos[2].replace("R$ ", "").replace(",", ".").replace("cada", ""))
	except:
		return
	return [descricao, fabricante, preco]


def scraping(list_mercado, list_produtos):
	itens = dict()
	supermercado = list()
	time.sleep(1.2)

	for produto in list_produtos:
		nome_produto_encoded = str(produto[1]).replace(" ", "%20")
		url = f'https://www.supermercadonow.com/produtos/{list_mercado[1]}/busca/{nome_produto_encoded}'
		driver.get(url)
		time.sleep(1.5)

		# Se nao abriu a pagina de produtos ou nao executou a regex => produto indisponivel
		try:
			# Regex para capturar a lista de produtos através da classe dinamica "styles__Container"
			classe = driver.execute_script(
				"return document.body.innerHTML.toString().match(/class=\"[\S]+ styles__Container-sc-[\w-]+/gi)"
			)[6] #sexta classe da lista (muito provavel ser a classe dos produtos))

			classe = re.sub('class=\"[\S]+\s?', ".", classe)
			div_produto = WebDriverWait(driver, 20).until(
				EC.presence_of_element_located((By.CSS_SELECTOR, classe))
			)
		except:
			continue

		# Pegar objeto
		infos = extraiProduto(div_produto.text)

		if not infos:
			continue
		
		regex_match = re.search(produto[2], infos[0], flags=re.IGNORECASE)

		if not regex_match:
			continue

		itens[produto[0]] = {
			'supermercado': list_mercado[0],
			'descricao': infos[0],
			'fabricante': infos[1],
			'preco': infos[2],
		}

		supermercado.append({
			"produto": produto[0],
			"descricao": infos[0],
			"fabricante": infos[1],
			"preco": infos[2]
		})
		time.sleep(0.5)

	return {"itens": itens, "supermercado": supermercado}


# criando driver geral
driver = webdriver.Chrome()