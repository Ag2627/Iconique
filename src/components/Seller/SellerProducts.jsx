// import { Button } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
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
  const [currentEditedId,setCurrentEditedId]=useState(null);
  const {toast}=useToast();


  function onSubmit(event){
    event.preventDefault();

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
  
  function isFormValid(){
    const { title, price, size, sustainable, quantity, category } = formData;

    return (
        title && 
        price && 
        size && 
        sustainable !== undefined && 
        quantity && 
        category
    );
  }

  useEffect(()=>{
    dispatch(fetchProducts());
  },[]);

  

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={()=>setOpenCreateProductsDialog(true)} >Add New Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          
          productList && productList.length>0?
          productList.map(productItem=><ProductTile setCurrentEditedId={setCurrentEditedId} 
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
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default SellerProducts 