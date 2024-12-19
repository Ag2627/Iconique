const AdminProductTile = ({ product, setFormData, setOpenCreateProductsDialog, setCurrentEditedId }) => {
    const handleEdit = () => {
      setFormData(product);
      setCurrentEditedId(product._id);
      setOpenCreateProductsDialog(true);
    };
  
    return (
      <div className="product-tile">
        <img src={product.image} alt={product.title} className="product-image" />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <button onClick={handleEdit}>Edit</button>
        {/* Add a delete button and handler if needed */}
      </div>
    );
  };
  
  export default AdminProductTile;
  