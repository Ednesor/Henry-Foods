const axios = require("axios");
const { Recipe, Op, Diet } = require("../db");
require('dotenv').config();
const { API_KEY } = process.env;
const api = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`;


const getByName = async (name) => {
    var recipes = [];
    try {
        const dbRecipes = await Recipe.findAll({
            include: {
                model: Diet,
            }
        });
        if(dbRecipes){
            recipes = [...dbRecipes]
        }
        const nameDiet = await axios.get(`${api}&query=${name}`);

        if (nameDiet.data.results) {
            for (i in nameDiet.data.results) {
                let { id, image, title, summary, diets, instructions, healthScore } = nameDiet.data.results[i];
                recipes = [...recipes, { id, image, title, summary, diets, instructions, healthScore }]
            }
        }

        if (recipes.length > 9 && recipes.length !== 0) {
            recipes.length = 9;
        }else if(recipes.length === 0){
            recipes = []
        }

        return recipes;

    } catch (error) {
        console.log("controllers/getByName", error)
    }
}

module.exports = getByName;