const axios = require("axios");
const datos = require("../datosPrueba.json")

const getApiRecipes = async (url) => {
    try {
        const apiRecipes = await axios(url)
        let recipes = [];

        for (i in apiRecipes.data.results) { //Datos por apiRecipes
            let { id, image, title, summary, diets, instructions, healthScore } = apiRecipes.data.results[i];//Datos por apiRecipes
            recipes = [...recipes, { id, image, title, summary, diets, instructions, healthScore }]
        }
        return recipes;

    } catch (error) {
        console.log("controllers/getApiRecipes", error)
    }
}

module.exports = getApiRecipes;