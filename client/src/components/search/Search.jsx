import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetch_diets, fetch_recipes } from "../../redux/actions/actions";
import style from "./Search.module.css";

export default function Search(){

    const [name, setName] = useState("");
    const [styleError, setError] = useState("");
    const dispatch = useDispatch()

    const history = useHistory()

    const handleChange = (e) => {
        setName(e.target.value);
        setError(checkInput(e.target.value))
    }

    const checkInput = (string) => {
        if(string[0] === " ") {
            return "notSpace"
        };
        if(string === "") {
            return "notNull"
        };
        if(!/^[A-Za-z\s]*$/.test(string)) {
            return "notNums"
        }
        return "allow";
    } 

    const handleSubmit = () => {
        if (checkInput(name) === "allow") {
            dispatch(fetch_recipes(name))
            history.push(`/search/${name}`)
        }else setError("notNull")
    }

    return(
        <div>
            <input type="text" name="" id="" value={name} onChange={handleChange}/>
            <button onClick={handleSubmit}>Search</button>
            {styleError === "notNums" && <p className={style.errorSearch}>No se admiten numeros</p>}
            {styleError === "notSpace" && <p className={style.errorSearch}>Hay espacios al inicio</p>}
            {styleError === "notNull" && <p className={style.errorSearch}>Debe ingresar un nombre</p>}
        </div>
    );
}