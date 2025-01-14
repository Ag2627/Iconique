import React, { useState } from 'react'
//import Image from 'next/image'
import { Edit, Trash2, Store, User, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const SellerProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    logo: "/placeholder.svg",
    storeName: "Jane's Awesome Store",
    storeDescription: "Selling the best products since 2020"
  })

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleEdit = (section) => {
    // Implement edit functionality here
    //console.log(Editing ${section} information)
  }

  const handleDelete = () => {
    // Implement delete functionality here
    console.log('Deleting profile')
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Seller Profile</CardTitle>
          <Avatar className="w-24 h-24">
            <AvatarImage src={profile.logo} alt={profile.name} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <User className="mr-2" /> Personal Information
              </h2>
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
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit('personal')}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure you want to delete your profile?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                      <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <Separator />
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Store className="mr-2" /> Store Information
              </h2>
              <div className="space-y-2">
                <h3 className="font-medium">{profile.storeName}</h3>
                <p>{profile.storeDescription}</p>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit('store')}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SellerProfilePage
