import {
    CREATE_RECIPE,
    DELETE_RECIPE,
    FETCH_RECIPES_REQUEST,
    FETCH__RECIPES_SUCCESS,
    FETCH__DIETS_SUCCESS,
    FETCH_FAILURE,
    SEARCH_RECIPE,
    DETAILED_RECIPE,
    FILTER_RECIPES,
    RESET_FILTERS
} from "../actions/actions";

const default_array_recipes = {
    originalRecipes: [],
    recipes: [],
    diets: [],
    searchRecipe: [],
    detailedRecipe: [],
    errorMSG: "",
    loading: false
}

const recipes = (state = default_array_recipes, action) => {
    switch (action.type) {
        case CREATE_RECIPE: {
            return {
                ...state,
                originalRecipes: [...state.originalRecipes, action.payload]
            }
        }
        case DELETE_RECIPE: {
            //TODO: BORRAR EN LA BASE DE DATOS
            console.log("Implementar")
            return{
                ...state
            }
        }
        case FETCH_RECIPES_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case FETCH__RECIPES_SUCCESS: {
            return {
                ...state,
                originalRecipes: [...action.payload],
                recipes: [...action.payload],
                loading: false
            }
        }
        case FETCH__DIETS_SUCCESS: {
            return {
                ...state,
                diets: [...action.payload],
                loading: false
            }
        }
        case FETCH_FAILURE: {
            return {
                ...state,
                errorMSG: action.payload,
                loading: false
            }
        }
        case SEARCH_RECIPE: {
            return {
                ...state,
                searchRecipe: [...action.payload],
                loading: false
            }
        }
        case DETAILED_RECIPE: {
            return {
                ...state,
                detailedRecipe: action.payload,
                loading: false,
            }
        }
        case FILTER_RECIPES: {
            let filteredRecipes = [...state.originalRecipes];
            if (action.payload.origin) {
                switch (action.payload.origin) {
                    case "ALL":
                        break;
                    case "API":
                        filteredRecipes = filteredRecipes.filter(r => !r.createdinDB);
                        break;
                    case "DB":
                        filteredRecipes = filteredRecipes.filter(r => r.createdinDB);
                        break;
                    default:
                        console.log("Invalid origin filter/reducer", action.payload.origin);
                        break;
                }
            }
            if (action.payload.diet) {
                if(action.payload.diet !== "All") filteredRecipes = filteredRecipes.filter(r => r.diets.map(d => d).join(" ").includes(action.payload.diet))
            }
            if (action.payload.sort) {
                switch (action.payload.sort) {
                    case "A-Z":
                        let n = filteredRecipes.length;

                        for (let i = 0; i < n; i++) {
                            let min = i;
                            for (let j = i + 1; j < n; j++) {
                                if (filteredRecipes[j].title.toLowerCase() < filteredRecipes[min].title.toLowerCase()) {
                                    min = j;
                                }
                            }
                            if (min !== i) {
                                let tmp = filteredRecipes[i];
                                filteredRecipes[i] = filteredRecipes[min];
                                filteredRecipes[min] = tmp;
                            }
                        }
                        break;
                    case "Z-A":
                        let m = filteredRecipes.length;

                        for (let i = 0; i < m; i++) {
                            let min = i;
                            for (let j = i + 1; j < m; j++) {
                                if (filteredRecipes[j].title.toLowerCase() > filteredRecipes[min].title.toLowerCase()) {
                                    min = j;
                                }
                            }
                            if (min !== i) {
                                let tmp = filteredRecipes[i];
                                filteredRecipes[i] = filteredRecipes[min];
                                filteredRecipes[min] = tmp;
                            }
                        }
                        break;
                    case "0-100":
                        let a = filteredRecipes.length;

                        for (let i = 0; i < a; i++) {
                            let min = i;
                            for (let j = i + 1; j < a; j++) {
                                if (filteredRecipes[j].healthScore < filteredRecipes[min].healthScore) {
                                    min = j;
                                }
                            }
                            if (min !== i) {
                                let tmp = filteredRecipes[i];
                                filteredRecipes[i] = filteredRecipes[min];
                                filteredRecipes[min] = tmp;
                            }
                        }
                        break;
                    case "100-0":
                        let b = filteredRecipes.length;

                        for (let i = 0; i < b; i++) {
                            let min = i;
                            for (let j = i + 1; j < b; j++) {
                                if (filteredRecipes[j].healthScore > filteredRecipes[min].healthScore) {
                                    min = j;
                                }
                            }
                            if (min !== i) {
                                let tmp = filteredRecipes[i];
                                filteredRecipes[i] = filteredRecipes[min];
                                filteredRecipes[min] = tmp;
                            }
                        }
                        break;
                    default:
                        console.log("Invalid sort filter/reducer", action.payload.sort);
                        break;
                }
            }
            return {
                ...state,
                recipes: filteredRecipes
            }
        }
    case RESET_FILTERS:
        return{
            ...state,
            recipes: state.originalRecipes
        }
    default:
        return state;
    }
}

export default recipes;