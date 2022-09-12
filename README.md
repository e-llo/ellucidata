# ellucidata

This project contains an efficient webscraping tool (Selenium) and data visualization dashboards. 

Find out how food's price changes over time with our data visualization tool. Powered by a webscraper tool that daily collects up-to-date data from supermarkets's websites!

<img width="614" alt="image" src="https://user-images.githubusercontent.com/61888090/189774585-cda81b05-bb5a-414f-a2fd-bf54f13e1252.png">


## 📖How does it work?
We developed an algorithm capable of scraping a website's interface, collecting data of a list of products in many supermarkets and send to a cloud MongoDB.
Also, some dashboards were developed (using HMTL, CSS and Javascript) to allow analysis on products' price changes over time.

## 🧰Languages and Tools
- Python
- MongoDB
- Selenium
- JavaScript
- NodeJS

## ⁉️Why?
Our goal is to collect data from online supermarkets' products in order to analyse price changes during some period of time.

---
## How can I run this locally?

 ### 💻 Prerequisites
 #### Scraper
* [Python3](https://www.python.org/downloads/)
* [Chrome Driver](https://chromedriver.chromium.org/downloads) (_make sure that the driver's version matches Google Chrome's version in your computer_)
#### Data Visualization
* [NodeJS](https://nodejs.org/en/download/)
* [NPM](https://www.npmjs.com/package/download)

### ☁️ Clone this repository
```bash
https://github.com/e-llo/ellucidata.git
``` 

### 🌿 Install Dependencies
On the command line (Windows OS):
#### Scraper
```bash
python -m pip install -r requirements.txt
```
#### Visualization
```bash
npm install
npm run env
```

### 🏃‍♀️ Run 
On the command line:
#### Scraper
```bash
python insert_data.py
```
#### Visualization
```bash
npm start
```
After the application is running, access http://localhost:1337/ from your browser

---

## 👩‍💻👨‍💻👨‍💻 Contributors
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/julia-rolemberg">
        <img src="https://avatars.githubusercontent.com/u/61888090?v=4" width="150px;" alt="Julia Rolemberg profile picture"/><br>
        <sub>
          <b>Julia Rolemberg</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/pedroheck">
        <img src="https://avatars.githubusercontent.com/u/68083697?v=4" width="150px;" alt="Pedro Heck profile picture"/><br>
        <sub>
          <b>Pedro Heck</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/RaphaelJesus1">
        <img src="https://avatars.githubusercontent.com/u/61888147?v=4" width="150px;" alt="Raphael Menezes profile picture"/><br>
        <sub>
          <b>Raphael Menezes de Jesus</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

