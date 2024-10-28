import { configureStore } from "@reduxjs/toolkit";
import categoriesSliceReducer from "../redux/categoriesSlice";
import userReducer from "../redux/userSlice";

const store = configureStore({
    reducer: {
        categories: categoriesSliceReducer,
        user: userReducer,
    },
});

export default store