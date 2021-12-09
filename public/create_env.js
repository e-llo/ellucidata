const fs = require("fs")

const conteudo = `
DB_URL=mongodb+srv://public:ellucidatapublic@ellucidata.ojijy.mongodb.net/ellucidata
DB_URL_NOSYMBOL=mongodb+srv://public:ellucidatapublic@ellucidata.ojijy.mongodb.net/ellucidata
`

// Verificar se o .env ja existe. Se sim, nao criar um novo.
fs.access(".env", fs.constants.F_OK, naoExiste => {

    if(naoExiste) {
        fs.writeFile(".env", conteudo, erro => {
            if(erro) throw erro
            console.log(".env criado com sucesso!")
        })
    }

})
