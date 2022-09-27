import React, { useState } from "react";
import Cards from "../cards/Cards.jsx";
import Filters from "../filters/Filters.jsx";
import style from "./Paginate.module.css";
import { useSelector } from "react-redux";

export default function Paginate() {
    const [page, setPage] = useState(0)
    const recipes = useSelector((state) => state.recipes);

    const buttons = () => {
        let buttonsArray = [];
        for (let i = 0; i < Math.ceil(recipes.recipes.length / 9); i++) {
            buttonsArray.push(<button key={i} onClick={() => setPage(i)}>{i + 1}</button>)
        }
        return buttonsArray;
    }

    return (
        <div className={style.container}>
            {buttons()}
            <Filters />
            <Cards page={page} />
        </div>
    );
}