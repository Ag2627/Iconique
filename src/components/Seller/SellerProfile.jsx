import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import axios from "axios";

const SellerProfile = ({ sellerId }) => {
  const [seller, setSeller] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Fetch seller details
    const fetchSeller = async () => {
      try {
        const response = await axios.get(`/seller/profile/${sellerId}`);
        setSeller(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching seller details", error);
      }
    };
    fetchSeller();
  }, [sellerId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(seller);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`/api/seller/${sellerId}`, formData);
      setSeller(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating seller details", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/seller/${sellerId}`);
      alert("Profile deleted successfully!");
      // Redirect or update UI after deletion
    } catch (error) {
      console.error("Error deleting profile", error);
    }
  };

  const handleDialogClose = (confirm) => {
    setOpenDialog(false);
    if (confirm) handleDelete();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!seller) return <Typography>Loading...</Typography>;

  return (
    <Box p={4}>
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar
          src={seller.logo}
          alt={seller.storeName}
          sx={{ width: 100, height: 100, marginRight: 2 }}
        />
        <Box>
          <Typography variant="h4" gutterBottom>
            {seller.storeName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {seller.description || "No description available"}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Store Details</Typography>
          <TextField
            label="Store Name"
            name="storeName"
            fullWidth
            margin="normal"
            value={formData.storeName}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            value={formData.description}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Personal Details</Typography>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <TextField
            label="Address"
            name="address"
            fullWidth
            margin="normal"
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <TextField
            label="Social Link"
            name="socialLink"
            fullWidth
            margin="normal"
            value={formData.socialLink}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        {isEditing ? (
          <>
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginRight: 2 }}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" color="primary" onClick={handleEdit} sx={{ marginRight: 2 }}>
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={() => setOpenDialog(true)}>
              Delete Profile
            </Button>
          </>
        )}
      </Box>

      <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your profile? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SellerProfile;
