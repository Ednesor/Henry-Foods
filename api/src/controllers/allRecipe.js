require('dotenv').config();
const {API_KEY} = process.env;
const getApiRecipes = require("./getApiRecipes");
const getDBRecipes = require("./getDBRecipes");

const apiLink = `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`;
// const apiLink = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
 const getByName = async() => {
    try {
        const apiRecipes = await getApiRecipes(apiLink);
        const dbRecipes = await getDBRecipes();
        const allRecipes = [...apiRecipes, ...dbRecipes]
        return allRecipes
    } catch (error) {
        console.log("controllers / allRecipe", error)
    }
}

module.exports = getByName;