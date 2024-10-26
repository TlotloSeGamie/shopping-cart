import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCategory } from '../redux/categoriesSlice';
import './ItemForm.css';
import NavBar from './Navbar';

const ItemForm = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const itemsByCategory = useSelector((state) => state.categories.items);

    const [activeCategory, setActiveCategory] = useState(null); // State for active category display
    const [selectedCategory, setSelectedCategory] = useState(''); // Separate state for item addition category
    const [item, setItem] = useState('');
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility

    const handleAddItem = (e) => {
        e.preventDefault();
        if (item && selectedCategory) {
            dispatch(addItemToCategory({ category: selectedCategory, item }));
            setItem('');
            setShowForm(false); 
        }
    };

    return (
        <div>
            <NavBar />
            <div className='category-container'>
                <div className='item-btns'>
                    <button onClick={() => setShowForm(!showForm)} className='item-btn'>
                        {showForm ? 'Cancel' : 'Add Item'}
                    </button>
                </div>
                {showForm && (
                    <form onSubmit={handleAddItem}>
                        <h2>Add Item to Category</h2>
                        <div>
                            <label htmlFor="category">Select Category to Add Item:</label>
                            <select
                                id="category"
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                value={selectedCategory}
                            >
                                <option value="">-- Select a Category --</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
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
                    </form>
                )}
                <h2>Categories</h2>
                <div className="categories">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`category-button ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                {/* Display items list below categories */}
                {activeCategory && (
                    <div className="item-list">
                        <h4>Items in {activeCategory}</h4>
                        <ul>
                            {itemsByCategory[activeCategory]?.length > 0 ? (
                                itemsByCategory[activeCategory].map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))
                            ) : (
                                <li className="no-items">No items in this category.</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemForm;
