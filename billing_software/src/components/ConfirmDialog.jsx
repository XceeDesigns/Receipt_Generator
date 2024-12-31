import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ConfirmDialog = ({ open, handleClose, handleConfirm, title, content }) => {
    return (
        <Dialog
            open={open}
            onClose={() => handleClose(false)}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
        >
            <DialogTitle id="confirm-dialog-title">{title || "Confirm Action"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="confirm-dialog-description">
                    {content || "Are you sure you want to proceed?"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(false)} color="secondary">
                    Cancel
                </Button>
                <Button onClick={() => handleConfirm()} color="#1e1e2f" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
