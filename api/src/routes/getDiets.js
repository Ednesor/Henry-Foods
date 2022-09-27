const router = require("express").Router();
const { Diet } = require("../db");
const createDiet = require("../controllers/createDiet")

router.get("/", async (req, res) => {
    try {
        const diets = [
            "Gluten Free",
            "Ketogenic", 
            "Vegetarian", 
            "Lacto vegetarian", 
            "Ovo vegetarian", 
            "Vegan", 
            "Pescetarian", 
            "Paleo", 
            "Primal", 
            "Low FODMAP", 
            "Whole30"
        ];
        const createDiets = await createDiet(diets);
        const getAllDiets = await Diet.findAll();
        res.json(getAllDiets)
    } catch (error) {
        res.send("Error al crear las dietas")
    }
    
})

module.exports = router;