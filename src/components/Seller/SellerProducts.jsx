import { Fragment } from "react"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet";
  import { useToast } from "@/components/ui/use-toast";
  import { Fragment, useEffect, useState } from "react";
  import CommonForm from "@/components/common/form";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    sustainable: "",
    price: "",
    size:"",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
  };

const SellerProducts = () => {
    const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();


  return (
    <Fragment>
    <div className="mb-5 w-full flex justify-end">
      <Button onClick={() => setOpenCreateProductsDialog(true)}>
        Add New Product
      </Button>
    </div>
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      {productList && productList.length > 0
        ? productList.map((productItem) => (
            <AdminProductTile
              setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              product={productItem}
              handleDelete={handleDelete}
            />
          ))
        : null}
    </div>
    <Sheet
      open={openCreateProductsDialog}
      onOpenChange={() => {
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null);
        setFormData(initialFormData);
      }}
    >
      <SheetContent side="right" className="overflow-auto">
        <SheetHeader>
          <SheetTitle>
            {currentEditedId !== null ? "Edit Product" : "Add New Product"}
          </SheetTitle>
        </SheetHeader>
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isEditMode={currentEditedId !== null}
        />
        <div className="py-6">
          <CommonForm
            onSubmit={onSubmit}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId !== null ? "Edit" : "Add"}
            formControls={addProductFormElements}
            isBtnDisabled={!isFormValid()}
          />
        </div>
      </SheetContent>
    </Sheet>
  </Fragment>
);
}

export default SellerProducts