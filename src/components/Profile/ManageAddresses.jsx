import React, { useContext, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/form'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAddress, editAddress, fetchAllAddresses } from '@/redux/store/address'
import { jwtDecode } from 'jwt-decode'
import { Navigate } from 'react-router-dom'
import AddressCard from './AddressCard'
import { useToast } from '@/hooks/use-toast'



const initialAddressFormData={
  address:'',
  city:'',
  pincode:'',
  phone:'',
  notes:'',
}
const ManageAddresses = ({setCurrAddress}) => {

  const [formData, setFormData] = useState(initialAddressFormData);
  const[currentEditedId,setCurrentEditedId]=useState(null);
  const dispatch = useDispatch();
  const token=localStorage.getItem('token');
  if(!token){
    return <Navigate to="/"/>;
  }
  const userId=jwtDecode(token)?.id;
  const {addressList}=useSelector(state=>state.Address);
  
  const {toast}=useToast();

  function handleManageAddress(event) {
    event.preventDefault();
    if(addressList.length>=3 && currentEditedId===null){
      setFormData(initialAddressFormData);
      toast({
        title:'Limit Reached',
        description:'You can only add 3 addresses',
        type:'destructive'
      });
      return;
    }
    currentEditedId!==null?
    dispatch(editAddress({userId:userId,addressId:currentEditedId,formData})).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllAddresses(userId));
        setCurrentEditedId(null);
        setFormData(initialAddressFormData);
        toast({
          title:'Address Updated',
          message:'Address has been updated successfully',
          type:'success'
        })
      }
    }):
    dispatch(addNewAddress({...formData})).then((data)=>{
      console.log(data);
      if(data?.payload?.success){
        dispatch(fetchAllAddresses(userId));
        setFormData(initialAddressFormData);
        toast({
          title:'Address Added',
          description:'Address has been added successfully',
          type:'success'
        })
      }
    });
  }
  
  function handleEditAddress(getCurrentAddress){
    setCurrentEditedId(getCurrentAddress._id);
    setFormData(getCurrentAddress);
  }
  
  function handleDeleteAddress(getCurrentAddress){
    dispatch(deleteAddress({userId:userId,addressId:getCurrentAddress._id})).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllAddresses(userId));
        toast({
          title:'Address Deleted',
          description:'Address has been deleted successfully',
          type:'success'
        })
      }
  })
}

  function isFormValid(){
    return Object.keys(formData).map(key=>formData[key].trim!=='').every(item=>item)
  }

  useEffect(()=>{
    dispatch(fetchAllAddresses(userId));
  },[dispatch,userId]);
  return (
    <Card>
      <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2'>
        {
          addressList && addressList.length>0 ?
          addressList.map(singleAddressItem=>(
            <AddressCard key={singleAddressItem._id} 
              handleDeleteAddress={handleDeleteAddress} 
              addressInfo={singleAddressItem}
              handleEditAddress={handleEditAddress}
              setCurrAddress={setCurrAddress}
          />)):null
        }
        
      </div>
      <CardHeader>
        <CardTitle>
          {
            currentEditedId!==null ? 'Edit Address':'Add New Address'
          }
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
          <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId!==null ? 'Edit':'Add'}
            onSubmit={handleManageAddress}
            isBtnDisabled={!isFormValid()}
          />
      </CardContent>
    </Card>  )
}

export default ManageAddresses;