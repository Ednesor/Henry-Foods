import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetch_recipes } from "../../redux/actions/actions";
import style from "./SearchPage.module.css";
import Loader from "../loader/Loader";
import Cards from "../cards/Cards";

export default function SearchPage(){
    let { name } = useParams()
    const recipes = useSelector(state => state.recipes);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(fetch_recipes(name))
    }

    return(
        <div>
            <button onClick={handleClick}>Buscar datos</button>
            {recipes.loading && <Loader />}
            {recipes.searchRecipe.length >= 1 && <Cards search={true}/>}
            {(recipes.searchRecipe.length === 0 && !recipes.loading) && <p>No se ha encontrado nada relacionado a {name}</p>}
            
        </div>
    )
}