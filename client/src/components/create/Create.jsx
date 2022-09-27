import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_create_recipe, fetch_recipes } from "../../redux/actions/actions";
import { useHistory } from "react-router-dom";
import style from "./Create.module.css";

export default function Create() {
    const dispatch = useDispatch()
    const history = useHistory();
    const store = useSelector(state => state.recipes)

    const [formPost, setFormPost] = useState({
        title: "",
        summary: "",
        image: "",
        healthScore: -1,
        diets: [],
        instructions: ""
    });

    const [errors, setErrors] = useState({
        title: "",
        summary: "",
        image: "",
        healthScore: "",
        diets: "",
        instructions: ""
    })

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (
            (formPost.title === "" || errors.title !== "" ||
                formPost.summary === "" || errors.summary !== "" ||
                formPost.image === "" || errors.image !== "" ||
                formPost.healthScore === -1 || errors.healthScore !== "" ||
                formPost.diets.length === 0 || errors.diets !== "" ||
                formPost.instructions === "") || errors.instructions !== ""
        ) {
            setChecked(false)
        } else {
            setChecked(true)
        }
    });

    const changeDiets = (e) => {
        let newDiets
        if (e.target.checked) {
            newDiets = [...formPost.diets, e.target.id]
            setFormPost({
                ...formPost,
                diets: newDiets
            })
        } else if (!e.target.checked) {
            newDiets = formPost.diets.filter(d => d !== e.target.id)
            setFormPost({
                ...formPost,
                diets: newDiets
            })
        }
        checkErrors(e.target.name, newDiets);
    }

    const handleChange = (e) => {
        if (e.target.name === "diets") {
            changeDiets(e);
        } else {
            setFormPost({
                ...formPost,
                [e.target.name]: e.target.value
            })
            checkErrors(e.target.name, e.target.value);
        }
    }

    const checkErrors = (form, data) => {
        let error = "";
        switch (form) {
            case "title":
                if (!/^[A-Za-z\s]*$/.test(data)) error = "No se permiten numeros o caracteres especiales";
                if (data[0] === " ") error = "No pueden haber espacios al inicio";
                if (data === "") error = "No puede quedar vacio";
                break;

            case "summary":
            case "instructions":
                if (data[0] === " ") error = "No deben haber espacios al inicio";
                if (data === "") error = "No puede quedar vacio";
                break;

            case "image":
                if (data[0] === ".") error = "Ingrese una url valida"
                if (!(data.substring(data.length - 4) === ".png" || data.substring(data.length - 4) === ".jpg")) error = "Debe ser un archivo PNG o JPG";
                if (data.includes(" ")) error = "La url de la imagen no puede contener espacios"
                if (data === "") error = "No puede quedar vacio";
                break;

            case "healthScore":
                if (data === -1) error = "Seleccione un valor"
                break;

            case "diets":
                if (data.length === 0) error = "Seleccione al menos un tipo de dieta"
                break;

            default:
                console.log("Datos incorrectos")
                break;
        }
        setErrors({
            ...errors,
            [form]: error
        })
    }
    const handleSubmit = () => {
        if (checked) {
            dispatch(fetch_create_recipe(formPost))

            dispatch(fetch_recipes());

        } else {
            alert("Por favor, complete los campos vacios")
        }
    }

    return (
        <div>
            <p>Create Recipe</p>
            <div>
                <p>Title</p>
                <input type="text" value={formPost.title} onChange={handleChange} name={"title"} />
                {errors.title !== "" && <p>{errors.title}</p>}
                <hr />
                <p>Summary</p>
                <textarea cols="50" rows="10" value={formPost.summary} onChange={handleChange} name={"summary"}></textarea>
                {errors.summary !== "" && <p>{errors.summary}</p>}
                <hr />
                <p>Image url</p>
                <input type="text" value={formPost.image} onChange={handleChange} name={"image"} />
                {errors.image !== "" && <p>{errors.image}</p>}
                <hr />
                <p>Health Score</p>
                <input type="range" value={formPost.healthScore} onChange={handleChange} name={"healthScore"} />
                <p>{formPost.healthScore === -1 ? "Nothing" : formPost.healthScore}</p>
                <hr />
                <p>Diets</p>
                {errors.diets !== "" && <p>{errors.diets}</p>}
                <div>
                    <label htmlFor="">
                        <input type="checkbox" id="gluten free" name="diets" onChange={handleChange} />
                        <span>Gluten Free</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" id="dairy free" name="diets" onChange={handleChange} />
                        <span>Dairy Free</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" id="ketogenic" name="diets" onChange={handleChange} />
                        <span>Ketogenic</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" id="vegetarian" name="diets" onChange={handleChange} />
                        <span>Vegetarian</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" id="lacto vegetarian" name="diets" onChange={handleChange} />
                        <span>Lacto Vegetarian</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" id="ovo vegetarian" name="diets" onChange={handleChange} />
                        <span>Ovo Vegetarian</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" id="vegan" name="diets" onChange={handleChange} />
                        <span>Vegan</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" id="pescatarian" name="diets" onChange={handleChange} />
                        <span>Pescatarian</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" id="paleo" name="diets" onChange={handleChange} />
                        <span>Paleo</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" id="primal" name="diets" onChange={handleChange} />
                        <span>Primal</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" id="low fodmap" name="diets" onChange={handleChange} />
                        <span>Low FODMAP</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" id="whole 30" name="diets" onChange={handleChange} />
                        <span>Whole 30</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" id="paleolithic" name="diets" onChange={handleChange} />
                        <span>Paleolithic</span>
                    </label>
                </div>
                <hr />
                <p>Instructions</p>
                {errors.instructions !== "" && <p>{errors.instructions}</p>}
                <textarea value={formPost.instructions} onChange={handleChange} name="instructions" id="" cols="50" rows="10"></textarea>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
};