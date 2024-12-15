// import { Button } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import CommonForm from '../common/form';
import { addProductFormElements } from '@/config';
import ProductImageUpload from './ProductImageUpload';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, fetchProducts } from '@/redux/store/seller/products-slice';

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
  averageReview: 0,
};

const SellerProducts = () => {
  const [openCreateProductsDialog,setOpenCreateProductsDialog]=useState(false);
  const [formData,setFormData]=useState(initialFormData);
  const [imageFile,setImageFile]=useState(null);
  const [uploadedImageUrl,setUploadedImageUrl]=useState('')
  const [imageLoadingState,setImageLoadingState]=useState(false);
  const {productList}=useSelector(state=>state.adminProducts)
  const dispatch=useDispatch(); //jo thunk se store me reducers banaye the uske liye


  function onSubmit(event){
    event.preventDefault();
    dispatch(addNewProduct({
      ...formData,
      image:uploadedImageUrl
    })).then((data)=>{
      console.log(data);
      if(data?.payload?.success){
        dispatch(fetchProducts());
        setImageFile(null);
        setFormData(initialFormData);

      }
    })
  }

  useEffect(()=>{
    dispatch(fetchProducts);
  },[dispatch]);


  console.log(productList,uploadedImageUrl,"formData");
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={()=>setOpenCreateProductsDialog(true)} >Add New Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'></div>
      <Sheet open={openCreateProductsDialog} onOpenChange={()=>{
        setOpenCreateProductsDialog(false);
      }}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          />
          <div className='py-6'>
            <CommonForm 
            onSubmit={onSubmit}
            formData={formData} setFormData={setFormData} buttonText='Add'
              formControls={addProductFormElements}

            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default SellerProducts 