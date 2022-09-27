import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetch_recipes } from "../../redux/actions/actions";
import defaultImage from "./default_image.jpg";
import style from "./Card.module.css";

export default function Card({recipe}){
    const history = useHistory()
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(fetch_recipes(null, recipe.id))
        history.push(`/detailed/${recipe.id}`)
    }
    const addDefaultSrc = (e) => {
        e.target.src = defaultImage;
      }
    return(
        <div className={style.container}>
            <p className={style.title}>{recipe.title}</p>
            <img className={style.image} onError={addDefaultSrc} src={recipe.image} alt="images" />
            <p className={style.diets}>{recipe.diets.join(" - ")}</p>
            <button className={style.buttonDetails} onClick={handleClick}>More details</button>
        </div>
    )
}