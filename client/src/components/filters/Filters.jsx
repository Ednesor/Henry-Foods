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
        <div className={style.container}>
            <div className={style.labelContainer}>
                <p className={style.title}>Origin</p>
                <label className={style.labelOrigin} >
                    <input type="radio" name="origin" id="ALL" onChange={handleChangeOrigin} />
                    <span>All</span>
                </label>
                <label className={style.labelOrigin} >
                    <input type="radio" name="origin" id="API" onChange={handleChangeOrigin} />
                    <span>API</span>
                </label>
                <label className={style.labelOrigin}>
                    <input type="radio" name="origin" id="DB" onChange={handleChangeOrigin} />
                    <span>DB</span>
                </label>
            </div>
            <div className={style.labelContainer}>
                <p className={style.title}>Diets</p>
                <label className={style.selectDiet}>
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
            </div>
            <div className={style.labelContainer}>
                <p className={style.title}>Sort</p>
                <label className={style.labelOrigin}>
                    <input type="radio" name="sort" id="A-Z" onChange={handleChangeSort} />
                    <span>A-Z</span>
                </label>
                <label className={style.labelOrigin}>
                    <input type="radio" name="sort" id="Z-A" onChange={handleChangeSort} />
                    <span>Z-A</span>
                </label>
                <label className={style.labelOrigin}>
                    <input type="radio" name="sort" id="100-0" onChange={handleChangeSort} />
                    <span>100-0</span>
                </label>
                <label className={style.labelOrigin}>
                    <input type="radio" name="sort" id="0-100" onChange={handleChangeSort} />
                    <span>0-100</span>
                </label>
            </div>
            <div className={style.buttonContainer}>
                <button onClick={filtrar}>Filter</button>
                <button onClick={resetFilters}>Reset Filters</button>
            </div>
        </div>
    )
}