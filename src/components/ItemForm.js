import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCategory } from '../redux/categoriesSlice';
import './ItemForm.css';

const ItemForm = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const itemsByCategory = useSelector((state) => state.categories.items);

    const [activeCategory, setActiveCategory] = useState(null); // State for active category
    const [item, setItem] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (item && activeCategory) {
            dispatch(addItemToCategory({ category: activeCategory, item }));
            setItem('');
        }
    };

    return (
        <div>
            <h2>Add Item to Category</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="category">Select Category:</label>
                    <select
                        id="category"
                        onChange={(e) => setActiveCategory(e.target.value)}
                    >
                        <option value="">-- Select a Category --</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                {activeCategory && (
                    <div>
                        <label htmlFor="item">Item:</label>
                        <input
                            type="text"
                            id="item"
                            value={item}
                            onChange={(e) => setItem(e.target.value)}
                            placeholder="Enter item name"
                        />
                        <button type="submit">Add Item</button>
                    </div>
                )}
            </form>

            <h3>Categories:</h3>
            <div className='categories'>
                {categories.map((category) => (
                    <div key={category} className="category-section">
                        <button
                            className="category-button"
                            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                        >
                            {category}
                        </button>
                        {activeCategory === category && (
                            <ul>
                                {itemsByCategory[category]?.length > 0 ? (
                                    itemsByCategory[category].map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))
                                ) : (
                                    <li className="no-items">No items in this category.</li>
                                )}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemForm;
