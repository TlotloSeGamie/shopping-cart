import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCategory } from '../redux/categoriesSlice';
import './ItemForm.css';
import NavBar from './Navbar';

const ItemForm = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories) || []; // Default to empty array
    const itemsByCategory = useSelector((state) => state.categories.items) || {};

    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [item, setItem] = useState('');
    const [showForm, setShowForm] = useState(false);

    // Retrieve the logged-in user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.email; 

    useEffect(() => {
        if (userId) {
            const savedItems = JSON.parse(localStorage.getItem(`items_${userId}`));
            if (savedItems) {
                dispatch({ type: 'categories/loadItems', payload: savedItems });
            }
        }
    }, [dispatch, userId]);

    const handleAddItem = (e) => {
        e.preventDefault();
        if (item && selectedCategory) {
            dispatch(addItemToCategory({ category: selectedCategory, item }));
            
            const currentUserEmail = localStorage.getItem('currentUser');
            const updatedItems = {
                ...itemsByCategory,
                [selectedCategory]: [...(itemsByCategory[selectedCategory] || []), item],
            };
            localStorage.setItem(`items_${currentUserEmail}`, JSON.stringify(updatedItems));
            
            setItem('');
            setShowForm(false);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="category-container">
                <div className="item-btns">
                    <button onClick={() => setShowForm(!showForm)} className="item-btn">
                        {showForm ? 'Cancel' : 'Add Item'}
                    </button>
                </div>
                {showForm && (
                    <form onSubmit={handleAddItem}>
                        <h2>Add Item to Category</h2>
                        <div>
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
                        </div>
                            <label htmlFor="category">Select Category to Add Item:</label>
                            <select
                                id="category"
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                value={selectedCategory}
                            >
                                <option value="">-- Select a Category --</option>
                                {Array.isArray(categories) && categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                                

                            <label htmlFor='notes'>Notes</label>
                            <input
                                type='text'
                                id='note'
                                // value={notes}
                                placeholder='Enter your notes/ description'
                            />
                            <button type="submit">Add Item</button>
                    </form>
                )}
                <h2>Categories</h2>
                <div className="categories">
                    {Array.isArray(categories) && categories.map((category) => (
                        <button
                            key={category}
                            className={`category-button ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
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
