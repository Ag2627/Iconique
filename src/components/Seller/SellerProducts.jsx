// import { Button } from '@mui/material'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import CommonForm from '../common/form';
import { addProductFormElements } from '@/config';
import ProductImageUpload from './ProductImageUpload';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, deleteProduct, editProduct, fetchProducts } from '../../redux/store/seller/products-slice/index';
import { useToast } from '@/hooks/use-toast';
import ProductTile from './ProductTile';


const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  sustainable: "",
  price: "",
  size: "",
  discount: "",
  quantity: "",
  tagline:'',
  averageReview: 0,
};

const SellerProducts = () => {
  const [openCreateProductsDialog,setOpenCreateProductsDialog]=useState(false);
  const [formData,setFormData]=useState(initialFormData);
  const [imageFile,setImageFile]=useState(null);
  const [uploadedImageUrl,setUploadedImageUrl]=useState('')
  const [imageLoadingState,setImageLoadingState]=useState(false);
  const {productList}=useSelector((state)=>state.adminProducts)
  const dispatch=useDispatch(); //jo thunk se store me reducers banaye the uske liye
  const [currentEditedId,setCurrentEditedId]=useState(null);
  const {toast}=useToast();
  const [errors, setErrors] = useState({}); 

  function validateForm() {
    const { title, price, size, sustainable, quantity, category } = formData;
    const newErrors = {};

    if (!title) newErrors.title = "Title is required";
    if (!price || price < 0) newErrors.price = "Price must be a non-negative value";
    if (!quantity || quantity < 0) newErrors.quantity = "Quantity must be a non-negative value";
    if (!category) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  const isFormValid = useMemo(() => validateForm(), [formData]);

  function onSubmit(event){
    event.preventDefault();
    if (!validateForm()) return;
    currentEditedId!==null?
    dispatch(editProduct({id:currentEditedId,formData})).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchProducts());
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null);
        setFormData(initialFormData);
        toast({
          title:'Product edited successfully'
        })
      }
    }):
    dispatch(addNewProduct({
      ...formData,
      image:uploadedImageUrl
    })).then((data)=>{
      console.log(data);
      if(data?.payload?.success){
        dispatch(fetchProducts());
        setOpenCreateProductsDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast({
          title:'Product added successfully'
        })
      }
    })
  }

  function handleDelete(getCurrentProductId){
    dispatch(deleteProduct(getCurrentProductId)).then(data=>{
      if(data?.payload?.success){
        dispatch(fetchProducts());
      }
    })
    
  }
  
  
  useEffect(()=>{
    dispatch(fetchProducts());
  },[dispatch]);

  

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={()=>setOpenCreateProductsDialog(true)} >Add New Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          
          productList && productList.length>0?
          productList.map(productItem=><ProductTile key={productItem._id} setCurrentEditedId={setCurrentEditedId} 
            setFormData={setFormData}
            setOpenCreateProductsDialog={setOpenCreateProductsDialog} product={productItem}
            handleDelete={handleDelete}
            />): null
        }  
      {/* yaha productlist se agar product aaya  toh prducttile se show*/}
      </div>
      <Sheet open={openCreateProductsDialog} onOpenChange={()=>{
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null); //jo fill kiya vo hatane ke liye;
        setFormData(initialFormData);
        setErrors({});

      }}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {
                currentEditedId!==null? 
                'Edit Product':'Add New Product' 
              }
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isEditMode={currentEditedId!==null}
          />
          <div className='py-6'>
            <CommonForm 
            onSubmit={onSubmit}
            formData={formData} setFormData={setFormData} buttonText={currentEditedId!==null? 'Edit':'Add'}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid}
              errors={errors}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default SellerProducts 