import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

const ProductTile = ({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) => {
  const salePrice = product?.price - (product?.price * product?.discount) / 100;
  return (
    <Card className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
      </div>
      <CardContent className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate flex items-center justify-between">
  <span>{product?.title}</span>
  <span className="text-sm text-gray-600 font-medium">Stock: {product?.quantity}</span>
</h2>

        <div className="flex justify-between items-center mb-3">
          <span
            className={`${
              product?.discount > 0 ? "line-through text-gray-500" : "text-gray-800"
            } text-lg font-semibold`}
          >
            ${product?.price}
          </span>
          {product?.discount > 0 && (
            <span className="text-lg font-bold text-green-600">${salePrice}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-gray-100">
        <Button
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}
          className="bg-blue-700 text-white hover:bg-blue-900 rounded px-4 py-2"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDelete(product?._id)}
          className="bg-blue-700 text-white hover:bg-blue-900 rounded px-4 py-2"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductTile;
