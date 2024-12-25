// PrivacyPolicyDialog.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const PrivacyPolicyDialog = ({ open, onClose }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, color: "white" }}>
        Privacy Policy
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          Welcome to our application. We value your privacy and are committed to protecting your
          personal data. This policy outlines how we collect, use, and safeguard your information.
        </Typography>
        <Typography variant="h6" gutterBottom>
          1. Data Collection
        </Typography>
        <Typography variant="body2" gutterBottom>
          We collect personal data such as your name, email address, phone number, and other
          information provided during the signup process. This data is used to provide and improve
          our services.
        </Typography>
        <Typography variant="h6" gutterBottom>
          2. Data Usage
        </Typography>
        <Typography variant="body2" gutterBottom>
          Your data is used to create your account, process transactions, and communicate updates
          regarding our services. We do not share your data with third parties without your
          consent.
        </Typography>
        <Typography variant="h6" gutterBottom>
          3. Data Protection
        </Typography>
        <Typography variant="body2" gutterBottom>
          We implement robust security measures to ensure your data is safe. However, no method of
          transmission over the internet is 100% secure, so we cannot guarantee absolute security.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please read our full privacy policy on our website for more details.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Agree
        </Button>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Disagree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrivacyPolicyDialog;
