import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../paginate/Paginate";
import style from "./Home.module.css"
import Loader from "../loader/Loader"
import { fetch_recipes } from "../../redux/actions/actions";

export default function Home(){
    const dispatch = useDispatch(); 
    const recipes = useSelector((state) => state.recipes);
    return(
        <div>
            {(recipes.originalRecipes.length === 0 && !recipes.loading) && dispatch(fetch_recipes())}
            {recipes.loading ? <Loader /> : <Paginate />}
        </div>
    );
}