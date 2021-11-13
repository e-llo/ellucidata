const mongoose = require("mongoose")
require('dotenv').config() // Usar variaveis de ambiente .env

const daySchema = new mongoose.Schema({
    data: {
        type: Date
    },
    itens: {
        type: Object,
    },
    supermercados: {
        type: Object
    }
})

const Day = mongoose.model("dias", daySchema, "dias")

async function getData() {
    await mongoose
        .connect(process.env.DB_URL_NOSYMBOL)

    let data = await Day.find({}).select("-_id")

    mongoose.connection.close()
    return data
}

module.exports = {getData}