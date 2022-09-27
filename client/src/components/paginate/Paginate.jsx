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
            buttonsArray.push(<button className={i === page ? style.actualButton : style.buttonPag} key={i} onClick={() => setPage(i)}>{i + 1}</button>)
        }
        return buttonsArray;
    }

    return (
        <div className={style.background}>
            <div className={style.container}>
                <Filters />
                <div className={style.buttonsContainer}>{buttons()}</div>
                <Cards page={page} />
            </div>
        </div>
    );
}