import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filter_recipes, reset_filters } from "../../redux/actions/actions";
import style from "./Filters.module.css";

export default function Filters() {
    const dispatch = useDispatch()
    const [filters, setFilters] = useState({
        origin: "ALL"
    });
    const filtrar = () => {
        console.log(filters)
        dispatch(filter_recipes(filters))
    }
    const resetFilters = () => {
        dispatch(reset_filters())
    }
    const handleChangeOrigin = (e) => {
        setFilters({
            ...filters,
            origin: e.target.id,
        })
    }
    const handleChangeDiets = (e) => {
        setFilters({
            ...filters,
            diet: e.target.options[e.target.options.selectedIndex].attributes.value.value,
        })
    }
    const handleChangeSort = (e) => {
        setFilters({
            ...filters,
            sort: e.target.id,
        })
    }
    return (
        <div>
            <p>Origin</p>
            <label htmlFor="">
                <input type="radio" name="origin" id="ALL" onChange={handleChangeOrigin} />
                All
            </label>
            <label htmlFor="">
                <input type="radio" name="origin" id="API" onChange={handleChangeOrigin} />
                API
            </label>
            <label htmlFor="">
                <input type="radio" name="origin" id="DB" onChange={handleChangeOrigin} />
                DB
            </label>
            <hr />
            <p>Diets</p>
            <label htmlFor="">
                <select name="" id="" onChange={handleChangeDiets}>
                    <option value="All">All</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lacto">Lacto Vegetarian</option>
                    <option value="ovo">Ovo Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="paleo">Paleo</option>
                    <option value="primal">Primal</option>
                    <option value="fodmap">Low FODMAP</option>
                    <option value="whole 30">Whole 30</option>
                    <option value="paleolithic">Paleolithic</option>

                </select>
            </label>
            <hr />
            <p>Sort</p>
            <label htmlFor="">
                <input type="radio" name="sort" id="A-Z" onChange={handleChangeSort} />
                A-Z
            </label>
            <label htmlFor="">
                <input type="radio" name="sort" id="Z-A" onChange={handleChangeSort} />
                Z-A
            </label>
            <label htmlFor="">
                <input type="radio" name="sort" id="100-0" onChange={handleChangeSort} />
                100-0
            </label>
            <label htmlFor="">
                <input type="radio" name="sort" id="0-100" onChange={handleChangeSort} />
                0-100
            </label>
            <hr />
            <button onClick={filtrar}>Filtrar</button>
            <button onClick={resetFilters}>Reset Filtros</button>
        </div>
    )
}