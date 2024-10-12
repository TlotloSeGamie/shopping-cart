import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCategory } from "../redux/categoriesSlice";
import "./Home.css"


const Home = () => {
    const categories = useSelector((state) => state.categories.categories);
    const items = useSelector((state) => state.categories.items);
    const dispatch = useDispatch();
    const [item, setItem] = useState('');
    const [selectedCategory, setSelectedCategory] = useState ('All');
    const [quantity, setQuantity] = useState(1);
    const [formVisible,setFormVisible] = useState(false);

    const HandleAddItems = () => {
        if (item && selectedCategory && quantity > 0) {
            for (let i = 0; i < quantity; i++) {
                dispatch(addItemToCategory({ category: selectedCategory, item}));
            }
            setItem('');
            setQuantity(1);
            setFormVisible(false);
        }
    };

    return (
        <div className="home-container">
            <div className="shopping-list">
                <h1>Shopping List</h1>
            </div>
            <div className="scrollmenu">
                <ul className="category-list">
                    <li onClick={() => setSelectedCategory("All")}>
                        All
                    </li>
                    {categories.map((category, index) => (
                        <li key={index} onClick={() => setSelectedCategory(category)}>
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
            <button className="show-form-button" onClick={() => setFormVisible(true)}>
                Add Item
            </button>
            {formVisible && (
                <div className="form-container">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All">All</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        placeholder="Enter item"
                    />
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                        placeholder="Quantity"
                    />
                    <button onClick={HandleAddItems}>Add items</button>
                    <button className="close-form-button" onClick={() => setFormVisible(false)}>
                        Close
                    </button>
                </div>
            )}
            <div className="items-list">
                <h2>Items in {selectedCategory}</h2>
                <ul>
                    {selectedCategory === "All"
                        ? Object.values(items).flat().map((item, index) => (
                            <li key={index}>{item}</li>
                        ))
                        : (items[selectedCategory]?.map((item, index) => (
                            <li key={index}>{item}</li>
                        )) || <li>No items yet.</li>)
                    }
                </ul>
            </div>
        </div>
    );
    
}

export default Home;

