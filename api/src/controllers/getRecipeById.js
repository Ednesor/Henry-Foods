const axios = require("axios");
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe, Op, Diet } = require("../db");
const getRecipeById = async (idParam) => {
    try {
        if (!idParam) {
            return "No se envio el id"
        }

        if (isNaN(idParam)) {
            const recipeDB = await Recipe.findOne({
                where: {
                    id: idParam
                },
                include: {
                    model: Diet
                }
            })
            if (recipeDB) {
                let diets = recipeDB.diets.map(d => {
                    return d.name
                });
                const recipe = {
                    title: recipeDB.title,
                    id: recipeDB.id,
                    summary: recipeDB.summary,
                    image: recipeDB.image,
                    healthScore: recipeDB.healthScore,
                    instructions: recipeDB.instructions,
                    diets: diets,
                    createdinDB: true
                }
                return recipe;
            }
        }

        const recipeAPI = await axios(`https://api.spoonacular.com/recipes/${idParam}/information?apiKey=${API_KEY}&addRecipeInformation=true`);
        if (recipeAPI) {
            const { id, image, title, summary, diets, instructions, healthScore, dishTypes } = recipeAPI.data;
            const recipe = { id, image, title, summary, diets, instructions, healthScore, dishTypes };
            return recipe;
        }

    } catch (error) {
        console.log("controllers/getRecipeById", error)
    }
}

module.exports = getRecipeById;