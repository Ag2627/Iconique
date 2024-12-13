// import { Button } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import CommonForm from '../common/form';
import { addProductFormElements } from '@/config';
import ProductImageUpload from './ProductImageUpload';
import { Button } from '../ui/button';

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
  function onSubmit(){

  }
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
          <ProductImageUpload file={imageFile} setFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}/>
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