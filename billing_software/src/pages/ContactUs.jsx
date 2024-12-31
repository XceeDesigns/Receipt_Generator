import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box, IconButton, CircularProgress, Snackbar, Alert } from '@mui/material';
import { AttachFile, Email, Send, Business } from '@mui/icons-material';

const ContactUs = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!subject || !message) {
            setSnackbar({ open: true, message: 'Please fill in both subject and message fields.', severity: 'warning' });
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('subject', subject);
            formData.append('message', message);
            if (file) formData.append('file', file);

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSnackbar({ open: true, message: 'Message sent successfully!', severity: 'success' });
                setSubject('');
                setMessage('');
                setFile(null);
            } else {
                setSnackbar({ open: true, message: 'Failed to send the message.', severity: 'error' });
            }
        } catch (error) {
            console.error('Error sending contact form:', error);
            setSnackbar({ open: true, message: 'An error occurred while sending the message.', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={4} sx={{ padding: 4, marginTop: 5, borderRadius: 2 }}>
                {/* Header Section */}
                <Box textAlign="center" mb={3}>
                    <Business color="primary" sx={{
                        fontSize: 50,
                        color: '#1e1e2f',
                    }} />
                    <Typography variant="h4" component="h1" gutterBottom>
                        Get in Touch
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        We're here to help and answer any questions you might have. Fill out the form below, and we'll get back to you as soon as possible.
                    </Typography>
                </Box>

                {/* Form Section */}
                <Box component="form" noValidate autoComplete="off">
                    {/* Subject Field */}
                    <TextField
                        fullWidth
                        label="Subject"
                        variant="outlined"
                        margin="normal"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />

                    {/* Message Field */}
                    <TextField
                        fullWidth
                        label="Message"
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    {/* File Upload Field */}
                    <Box display="flex" alignItems="center" mt={2} mb={3}>
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<AttachFile />}
                            sx={{
                                marginRight: 2,
                                backgroundColor: '#1e1e2f',
                                color: '#fff',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#3a3a4c',
                                },
                            }}
                        >
                            Attach File
                            <input type="file" hidden onChange={handleFileChange} />
                        </Button>
                        {file && <Typography variant="body2">{file.name}</Typography>}
                    </Box>

                    {/* Send Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        endIcon={loading ? <CircularProgress size={20} /> : <Send />}
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{
                            backgroundColor: '#1e1e2f',
                            color: '#fff',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#3a3a4c',
                            },
                        }}
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                </Box>
            </Paper>

            {/* Snackbar Notification */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ContactUs;
