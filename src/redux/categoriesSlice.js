import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [
        "All", 
        "Fruits",
        "Vegetables",
        "Meat & Fish",
        "Bread & Baked Goods",
        "Frozen Foods",
        "Cans & Jars",
        "Grains",
        "Sauces & Condiments",
        "Spices and Herbs",
        "Snacks",
        "Drinks",
        "Household and Cleaning",
        "Personal Care",
        "Baby Products"
    ],
    items: {}
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addItemToCategory: (state, action) => {
            const { category, item } = action.payload;
            if (!state.items[category]) {
                state.items[category] = [];
            }
            state.items[category].push(item);
        },
        loadItems: (state, action) => {
            state.items = action.payload; // Load items from localStorage into state
        }
    }
});

export const { addItemToCategory, loadItems } = categoriesSlice.actions;
export default categoriesSlice.reducer;
