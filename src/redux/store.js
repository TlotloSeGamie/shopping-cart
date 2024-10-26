import { configureStore } from "@reduxjs/toolkit";
import categoriesSliceReducer from "./categorieSlice";

const store = configureStore({
    reducer: {
        catogeries: categoriesSliceReducer,
    },
});

export default store