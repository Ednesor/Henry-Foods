import React from "react";
import { Link } from "react-router-dom";
import style from "./Startpage.module.css";

export default function Startpage(){
    return(
        <div className={style.container}>
            <div className={style.infoCont}>
            <p className={style.title}>Welcome to my PI</p>
            <p className={style.name}>Made by Edgardo Funes</p>
            <Link className={style.buttonLink} to={"/home"}>Start Page</Link>
            </div>
        </div>
    );
};