import { configureStore } from "@reduxjs/toolkit";
import categoriesSliceReducer from "./categoriesslice";

const store = configureStore({
    reducer: {
        catogeries: categoriesSliceReducer,
    },
});

export default store