
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct, deleteProduct } from '../redux/productSlice';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';


function Product() {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleAddProduct = () => {
    if (name && description) {
      dispatch(addProduct({ id: Date.now(), name, description }));
      setName('');
      setDescription('');
    }
  };

  const handleUpdateProduct = () => {
    if (name && description && editId !== null) {
      dispatch(updateProduct({ id: editId, name, description }));
      setName('');
      setDescription('');
      setEditMode(false);
      setEditId(null);
    }
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setEditId(product.id);
    setName(product.name);
    setDescription(product.description);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="ProductManager">
      <h1>Product Management</h1>
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {editMode ? (
          <button onClick={handleUpdateProduct}>Update Product</button>
        ) : (
          <button onClick={handleAddProduct}><FaPlus /></button>
        )}
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - {product.description}
            <button onClick={() => handleEdit(product)}><FaEdit /></button>
            <button onClick={() => handleDelete(product.id)}><FaTrash /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Product;
