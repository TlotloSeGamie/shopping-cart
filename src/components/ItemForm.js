import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; 
import { loadItems } from '../redux/categoriesSlice';
import './ItemForm.css';
import NavBar from './Navbar';
import { RiShareLine, RiDeleteBin6Line, RiEditLine } from 'react-icons/ri';

const ItemForm = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories) || [];
    const itemsByCategory = useSelector((state) => state.categories.items) || {};

    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.email;

    useEffect(() => {
        if (userId) {
            const savedItems = JSON.parse(localStorage.getItem(`items_${userId}`)) || {};
            dispatch(loadItems(savedItems));
        }
    }, [dispatch, userId]);

    const handleAddItem = (e) => {
        e.preventDefault();
        if (item && selectedCategory && quantity) {
            const newItem = {
                id: isEditing && selectedItem ? selectedItem.id : uuidv4(),  
                item,
                quantity,
                notes: selectedItem?.notes || null,
            };

            const updatedItems = {
                ...itemsByCategory,
                [selectedCategory]: isEditing && selectedItem
                    ? itemsByCategory[selectedCategory].map((i) =>
                          i.id === selectedItem.id ? newItem : i 
                      )
                    : [...(itemsByCategory[selectedCategory] || []), newItem], 
            };

            localStorage.setItem(`items_${userId}`, JSON.stringify(updatedItems));
            dispatch(loadItems(updatedItems));

            resetForm();
        }
    };

    const handleDeleteItem = (category, itemToDelete) => {
        const updatedItems = {
            ...itemsByCategory,
            [category]: itemsByCategory[category].filter((i) => i.id !== itemToDelete.id),
        };
        localStorage.setItem(`items_${userId}`, JSON.stringify(updatedItems));
        dispatch(loadItems(updatedItems));
    };

    const handleEditItem = (category, item) => {
        setItem(item.item);
        setQuantity(item.quantity);
        setSelectedCategory(category);
        setShowForm(true);
        setIsEditing(true);
        setSelectedItem(item);  
    };

    const resetForm = () => {
        setItem('');
        setQuantity('');
        setSelectedCategory('');
        setShowForm(false);
        setIsEditing(false);
        setSelectedItem(null);
    };

    const openDetailsModal = (item) => {
        setSelectedItem(item);
    };

    const closeDetailsModal = () => {
        setSelectedItem(null);
    };

    const handleShare = async (content) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Shared Item',
                    text: content,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            alert('Sharing is not supported on this device.');
        }
    };

    return (
        <div>
            <NavBar />
            <div className="category-container">
                <button onClick={() => setShowForm(!showForm)} className="item-btn">
                    {showForm ? 'Cancel' : 'Add Item'}
                </button>
                {showForm && (
                    <form onSubmit={handleAddItem} className="item-form">
                        <h2>{isEditing ? 'Update Item' : 'Add Item to Category'}</h2>
                        <div>
                            <label htmlFor="item">Item:</label>
                            <input
                                type="text"
                                id="item"
                                value={item}
                                onChange={(e) => setItem(e.target.value)}
                                placeholder="Enter item name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity">Quantity:</label>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Enter quantity"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="category">Select Category:</label>
                            <select
                                id="category"
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                value={selectedCategory}
                                required
                            >
                                <option value="">-- Select a Category --</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit">{isEditing ? 'Update Item' : 'Add Item'}</button>
                    </form>
                )}
                <h2>Categories</h2>
                <div className="categories">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`category-button ${activeCategory === category ? 'active' : ''}`}
                            onClick={() =>
                                setActiveCategory(activeCategory === category ? null : category)
                            }
                        >
                            {category}
                        </button>
                    ))}
                </div>
                {activeCategory && (
                    <div className="item-list">
                        <h4>Items in {activeCategory}</h4>
                        <ul>
                            {itemsByCategory[activeCategory]?.map((item, index) => (
                                <li key={index} className="item-list-entry">
                                    <strong>{item.item}</strong> (Qty: {item.quantity})<br />
                                    {item.notes && <em>Notes: {item.notes}</em>}<br />
                                    <div className='buttons'>
                                        <button
                                            onClick={() => openDetailsModal(item)}
                                            className="view-details-button"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => handleShare(item.item)}
                                            className="share-button"
                                            title="Share Item"
                                        >
                                            <RiShareLine size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleEditItem(activeCategory, item)}
                                            className="edit-button"
                                            title="Edit Item"
                                        >
                                            <RiEditLine size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteItem(activeCategory, item)}
                                            className="delete-button"
                                            title="Delete Item"
                                        >
                                            <RiDeleteBin6Line size={20} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {selectedItem && (
                <div className="details-modal">
                    <div className="details-content">
                        <h3>Item Details</h3>
                        <p><strong>Name:</strong> {selectedItem.item}</p>
                        <p><strong>Quantity:</strong> {selectedItem.quantity}</p>
                        <p><strong>Notes:</strong> {selectedItem.notes || 'No notes available.'}</p>
                        <button onClick={closeDetailsModal} className="close-details-button">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemForm;
