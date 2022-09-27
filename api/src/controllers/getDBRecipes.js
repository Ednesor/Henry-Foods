const { Recipe, Op, Diet } = require("../db");

const getDBRecipes = async () => {
    try {
        const recipes = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                    diets: [],
                },
            }
        });
        let allRecipes = [];
        for (let i = 0; i < recipes.length; i++) {
            let diets = recipes[i].diets.map(d => {
                return d.name
            });

            let newRecipe = {
                title: recipes[i].title,
                id: recipes[i].id,
                summary: recipes[i].summary,
                image: recipes[i].image,
                healthScore: recipes[i].healthScore,
                instructions: recipes[i].instructions,
                diets: diets,
                createdinDB: true
            }
            allRecipes.push(newRecipe)
        }
        return allRecipes;
    } catch (error) {
        console.log("controllers/getDBrecipes", error)
    }
}

module.exports = getDBRecipes