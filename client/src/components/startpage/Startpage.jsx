import React from "react";
import { Link } from "react-router-dom";
import style from "./Startpage.module.css";

export default function Startpage(){
    return(
        <div>
            Pagina de inicio, Bienvenidos
            <Link to={"/home"}>Home</Link>
        </div>
    );
};