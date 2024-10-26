import { configureStore } from "@reduxjs/toolkit";
import categoriesSliceReducer from "../redux/categoriesSlice";

const store = configureStore({
    reducer: {
        categories: categoriesSliceReducer,
    },
});

export default store