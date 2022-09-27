import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Create from "../create/Create";
import ErrorPage from "../errorPage/ErrorPage";
import Header from "../header/Header";
import Home from "../home/Home";
import Info from "../Info/Info";
import SearchPage from "../searchPage/SearchPage";
import style from "./Main.module.css";

export default function Main(){
    return(
        <Router>
            <Header />
            <Switch>
                <Route path={"/home"}>
                    <Home />
                </Route>
                <Route path={"/create"}>
                    <Create />
                </Route>
                <Route path={"/search/:name"}>
                    <SearchPage />
                </Route>
                <Route path={"/detailed/:id"}>
                    <Info />
                </Route>
                <Route path={"*"}>
                    <ErrorPage />
                </Route>
            </Switch>
        </Router>
    )
}