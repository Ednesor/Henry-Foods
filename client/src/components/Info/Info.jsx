import React from "react";
import { useSelector } from "react-redux";
import Loader from "../loader/Loader";
import style from "./Info.module.css";

export default function Info() {
    const recipe = useSelector(state => state.recipes.detailedRecipe);
    const status = useSelector(state => state.recipes.loading)
    return (
        <div>
            {status && <Loader />}
            {recipe.title &&
                <div>
                    <h1>{recipe.title}</h1>
                    <h3>Health Score: {recipe.healthScore}</h3>
                    <img src={recipe.image} alt="images" />
                    {console.log(recipe.diets)}
                    <p>Diets: {recipe.diets.join(", ")}</p>
                    <hr />
                    <h3>Dish Types</h3>
                    {recipe.dishTypes && <p>{recipe.dishTypes.join(", ")}</p>}
                    <hr />
                    <h3>Summary</h3>
                    {<div dangerouslySetInnerHTML={{ __html: recipe.summary }} />}
                    <hr />
                    <h3>Instructions</h3>
                    {<div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />}

                </div>
            }
        </div>
    );
}