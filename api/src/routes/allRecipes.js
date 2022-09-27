const router = require("express").Router();

const getByName = require("../controllers/getByName")
const getAll = require("../controllers/allRecipe")


router.get("/", async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const getName = await getByName(name)
            res.json(getName)
        }else{
            const recipe = await getAll();
            res.json(recipe)
        }

    } catch (error) {
        console.log(error)
        res.status(400).send("Error al traer los datos")
    }
})

module.exports = router;