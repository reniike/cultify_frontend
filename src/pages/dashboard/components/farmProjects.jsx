import React, { useState } from 'react';
import '../styles/farmProjects.css';

const FarmProjects = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setName('');
    setDescription('');
    setQuantity('');
    setPrice('');
    setImage(null);
  };

  return (
    <React.Fragment>
    <div classname="farmerStockUploadingPageContainer">
      <h1>Upload Farm Produce</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} required />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} required />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" value={price} onChange={handlePriceChange} required />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange} accept="image/*" required />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
    </React.Fragment>
  );
};

export default FarmProjects;
