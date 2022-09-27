const router = require("express").Router();
const { Recipe, Diet } = require("../db");
const getRecipeId = require("../controllers/getRecipeById")

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id: ")
        const recipe = await getRecipeId(id);

        res.json(recipe)
    } catch (error) {
        console.log("Error al buscar una receta")
        res.send("Receta no encontrada")
    }
    
})

module.exports = router;