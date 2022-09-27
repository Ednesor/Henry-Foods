export const CREATE_RECIPE = "CREATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const FETCH_RECIPES_REQUEST = "FETCH_RECIPES_REQUEST";
export const FETCH__RECIPES_SUCCESS = "FETCH__RECIPES_SUCCESS";
export const FETCH__DIETS_SUCCESS = "FETCH__DIETS_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const SEARCH_RECIPE = "SEARCH_RECIPE";
export const DETAILED_RECIPE = "DETAILED_RECIPE";
export const FILTER_RECIPES = "FILTER_RECIPES";
export const RESET_FILTERS = "RESET_FILTERS";

export const create_recipe = (newRecipe) => {
    return {
        type: CREATE_RECIPE,
        payload: newRecipe
    }
}
export const fetch_create_recipe = (newRecipe) => {
    return(dispatch) => {
        fetch(`http://localhost:3001/create`, {
            method: "POST",
            body: JSON.stringify(newRecipe),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                alert(response);
                // console.log(response)
                dispatch(create_recipe(newRecipe))
            })
            .catch(error => {
                alert("El nombre esta en uso");
                dispatch(fetch_failure(error));
            })
    }
}
export const delete_recipe = (idRecipe) => {
    return {
        type: DELETE_RECIPE,
        payload: idRecipe
    }
}
export const fetch_recipes_request = () => {
    return {
        type: FETCH_RECIPES_REQUEST
    }
}
export const fetch_recipes_success = (recipes) => {
    return {
        type: FETCH__RECIPES_SUCCESS,
        payload: recipes
    }
}
export const fetch_diets_success = (diets) => {
    return {
        type: FETCH__DIETS_SUCCESS,
        payload: diets
    }
}
export const fetch_failure = (error) => {
    return {
        type: FETCH_FAILURE,
        payload: error
    }
}
export const fetch_recipes = (name, id) => {
    if (name) {
        return (dispatch) => {
            dispatch(fetch_recipes_request());
            fetch(`http://localhost:3001/recipes?name=${name}`)
                .then(response => response.json())
                .then(response => {
                    dispatch(search_recipe(response))
                })
                .catch(error => {
                    dispatch(fetch_failure(error))
                })
        }
    } else if (id) {
        return (dispatch) => {
            dispatch(fetch_recipes_request());
            fetch(`http://localhost:3001/${id}`)
                .then(response => response.json())
                .then(response => {
                    dispatch(detailed_recipe(response))
                })
                .catch(error => {
                    dispatch(fetch_failure(error))
                })
        }
    } else {
        return (dispatch) => {
            dispatch(fetch_recipes_request());
            fetch(`http://localhost:3001/recipes`)
                .then(response => response.json())
                .then(response => {
                    dispatch(fetch_recipes_success(response))
                })
                .catch(error => {
                    //console.log("actions/fetch_recipes", error)
                    dispatch(fetch_failure(error))
                });
        }
    }
}
export const fetch_diets = () => {
    return (dispatch) => {
        fetch(`http://localhost:3001/diets`)
            .then(response => response.json())
            .then(response => {
                dispatch(fetch_diets_success(response))
            })
            .catch(error => {
                dispatch(fetch_failure(error))
            })
    }
}
export const search_recipe = (recipes) => {
    return {
        type: SEARCH_RECIPE,
        payload: recipes
    }
}
export const detailed_recipe = (recipe) => {
    return {
        type: DETAILED_RECIPE,
        payload: recipe
    }
}
export const filter_recipes = (filters) => {
    return {
        type: FILTER_RECIPES,
        payload: filters
    }
}
export const reset_filters = () => {
    return{
        type: RESET_FILTERS,
    }
}
