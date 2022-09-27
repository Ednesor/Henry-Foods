const { Router } = require("express");
const { Recipe, Diet } = require("../db");

const createDiet = async (diets) => {
    try {
        let array = [];
        for (i in diets) {
            const diet = await Diet.findAll({ where: { name: diets[i] } });
            if (diet.length < 1) {
                const createDiets = await Diet.create({ name: diets[i] })
                array.push(createDiets)
            } else {
                array.push(
                    await Diet.findOne({
                        where: {
                            name: diets[i]
                        }
                    })
                )
            }
        }
        return array;
    } catch (error) {
        console.log("controllers/createDiet", error)
    }
}

module.exports = createDiet;