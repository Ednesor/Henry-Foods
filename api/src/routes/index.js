const { Router } = require('express');
const getRecipes = require("./allRecipes");
const getById = require("./getByID");
const postRecipe = require("./createRecipe");
const getDiets = require("./getDiets");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", getRecipes);
router.use("/create", postRecipe);
router.use("/diets", getDiets);
router.get("/:id", getById);


module.exports = router;
