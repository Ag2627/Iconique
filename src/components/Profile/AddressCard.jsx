import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

const AddressCard = ({ addressInfo, handleDeleteAddress, handleEditAddress, setCurrAddress }) => {
  return (
    <Card onClick={setCurrAddress? ()=>{setCurrAddress(addressInfo)}:null} className="flex flex-col h-full">
      <CardContent className="grid gap-4 p-4 flex-grow">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 mt-auto flex justify-between">
        <Button style={{margin:2, padding:1}} onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
