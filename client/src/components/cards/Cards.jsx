import React from "react";
import style from "./Cards.module.css";
import Card from "../card/Card";
import { useSelector } from "react-redux";

export default function Cards( {page, search} ){
    const recipes = useSelector((state) => state.recipes.recipes);
    const searchRecipes = useSelector((state) => state.recipes.searchRecipe);
    const cardsPerPage = 9;

    const createCard = (recipesPag) => {
        return recipesPag.map((recipe, i) => {
            return <Card key={i} recipe={recipe}/>
        })
    }
    const paginateCards = (search) => {
        let arrayRecipes = [];
        if(!search){
            arrayRecipes.push(createCard(recipes.slice(page*cardsPerPage, page*cardsPerPage+cardsPerPage)))
        }else{
            arrayRecipes.push(createCard(searchRecipes))
        }
        return arrayRecipes;
    }

    return(
        <div className={style.container}>
            {paginateCards(search)}
        </div>
    )
}