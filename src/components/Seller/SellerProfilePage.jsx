import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {jwtDecode} from "jwt-decode";

import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  fetchSellerProfile,
  
  updateSellerProfile,
 
  deleteSellerProfile,
  
} from "@/redux/store/seller-pofile";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Store, User, Mail, Phone, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CommonForm from "../common/sellerform";
import {
  sellerPersonalProfileFormControls,
  sellerStoreProfileFormControls,
} from "@/config";

const initialSellerFormData = {
  name: "",
  email: "",
  address: "",
  phone: "",
  storeName: "",
  description: "",
  socialLink: "",
  logo: "",
};

const SellerProfilePage = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState(initialSellerFormData);
  const [editingSection, setEditingSection] = useState(false); // Track the section being edited
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }

  const sellerId = jwtDecode(token)?.id;
  const { profile, isLoading, error } = useSelector(
    (state) => state.sellerProfile
  );

  const handleManageUser = (event) => {
    event.preventDefault();
    dispatch(updateSellerProfile({ id: sellerId, data: formData })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchSellerProfile(sellerId)); // Refresh the profile
        setEditingSection(null);
        setFormData(initialSellerFormData); // Reset form data
        toast({
          title: "Profile Updated",
          message: "Profile has been updated successfully",
          type: "success",
        });
      } else {
        toast({
          title: "Error",
          message: "Failed to update profile.",
          type: "error",
        });
      }
    });
  };
  

  const handleEdit = (section) => {
    setEditingSection(section);
    setFormData({
      ...profile
    });
  };
  const handleDelete = async () => {
    try {
      // Step 1: Delete all products associated with the seller
      // const productDeleteResponse = await dispatch(deleteProductBySellerId(sellerId)).unwrap();
      // if (!productDeleteResponse.success) {
      //   toast({
      //     title: "Error",
      //     message: "Failed to delete associated products.",
      //     type: "error",
      //   });
      //   return;
      // }

      // Step 2: Delete the seller profile
      const profileDeleteResponse = await dispatch(deleteSellerProfile(sellerId)).unwrap();
      if (profileDeleteResponse.success) {
        localStorage.removeItem("token");
        navigate("/");
        toast({
          title: "Success",
          message: "Seller profile and associated products deleted successfully.",
          type: "success",
        });
      } else {
        toast({
          title: "Error",
          message: "Failed to delete seller profile.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting seller profile:", error);
      toast({
        title: "Error",
        message: "An unexpected error occurred.",
        type: "error",
      });
    }
  };
  useEffect(() => {
      dispatch(fetchSellerProfile(sellerId));
    }, [dispatch, sellerId]);
  // const handleSave = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await dispatch(updateSellerProfile({ id: sellerId, formData })).unwrap();
  //     if (response.success) {
  //       // Re-fetch updated profile
  //       dispatch(fetchSellerProfile(sellerId));
  //       setEditingSection(null);
  //       setFormData(initialSellerFormData); // Reset form data
  //       toast({
  //         title: "Profile Updated",
  //         message: "Your profile has been updated successfully",
  //         type: "success",
  //       });
  //     } else {
  //       toast({
  //         title: "Update Failed",
  //         message: "An error occurred while updating your profile.",
  //         type: "error",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Update failed:", error);
  //     toast({
  //       title: "Error",
  //       message: "An unexpected error occurred.",
  //       type: "error",
  //     });
  //   }
  // };
  

  // const handleDelete = () => {
  //   dispatch(deleteSellerProfile(sellerId)).then((data) => {
  //     if (data?.payload?.success) {
  //       localStorage.removeItem("token");
  //       navigate("/");
  //       toast({
  //         title: "Profile Deleted",
  //         message: "Your seller profile has been deleted.",
  //         type: "success",
  //       });
  //     }
  //   });
  // };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile found</div>;
  console.log("profile: ",profile);
  console.log("data: ",profile);
  console.log("logo: ",profile.logo);
  console.log("name: ",profile.name);
  console.log("description ",profile.description);
  
  
  

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Seller Profile</CardTitle>
          <Avatar className="w-24 h-24">
            <AvatarImage src={profile?.logo} alt={profile?.name} /> 
            
            {console.log("phir se profile",profile)}
            <AvatarFallback>{profile?.name}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            Personal Information
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <User className="mr-2" /> Personal Information
              </h2>
              {editingSection === "personal" ? (
                <CommonForm
                  formControls={sellerPersonalProfileFormControls}
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleManageUser}
                  buttonText="Save"
                />
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Mail className="mr-2" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center col-span-full">
                      <MapPin className="mr-2" />
                      <span>{profile.address}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => handleEdit("personal")}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </>
              )}
            </div>

            <Separator />

            {/* Store Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Store className="mr-2" /> Store Information
              </h2>
              {editingSection === "store" ? (
                <CommonForm
                  formControls={sellerStoreProfileFormControls}
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleManageUser}
                  buttonText="Save"
                />
              ) : (
                <>
                  <div className="space-y-2">
                    <h3 className="font-medium">{profile.storeName}</h3>
                    <p>{profile.description}</p>
                    <p>{profile.socialLink}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => handleEdit("store")}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </>
              )}
            </div>
            <Separator />
            <div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Profile
              </Button>
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Seller Profile</DialogTitle>
                    <DialogDescription>
                      This action will delete your seller profile and all associated products. 
                      Are you sure you want to proceed?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                      Confirm Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerProfilePage;