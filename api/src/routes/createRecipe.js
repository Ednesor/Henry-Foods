const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const router = Router();
const createDiets = require("../controllers/createDiet");

router.post("/", async (req, res) => {
    console.log("Crear receta")
    try {
        let { title, image, summary, healthScore, diets, instructions } = req.body;

        if (
            !title ||
            !image ||
            !summary ||
            !healthScore ||
            !diets ||
            !instructions
        ) {
            return res.status(400).json("Faltan parametros");
        }
        const findRecipe = await Recipe.findOne({ where: { title: title } });
        if (findRecipe) {
            return res.status(400).json("El nombre ya está en uso")
        }
        //Creo la receta en la base de datos
        const createRecipe = await Recipe.create({
            title,
            image,
            summary,
            healthScore,
            instructions,
            createdInDB: true
        })

        //Busco el ultimo elemento creado
        const last = await Recipe.findOne({
            order: [['createdAt', 'DESC']],
            limit: 1
        });

        //Creo las dietas si no estan creadas
        const dietSec = await createDiets(diets)

        //Agrego las dietas
        await last.addDiet(dietSec);
        
        return res.json("Receta creada exitosamente")
    } catch (error) {
        console.log(error)
        return res.send("No se pudo crear la receta")
    }
})

module.exports = router;