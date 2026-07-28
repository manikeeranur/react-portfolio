import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box, TextField, Button, Typography, InputAdornment,
  IconButton, Alert, Paper, Divider
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: '#1e1b2e',
    background: 'rgba(30,27,46,0.05)',
    borderRadius: '10px',
    '& fieldset': { borderColor: 'rgba(30,27,46,0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(109,92,216,0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#6d5cd8', borderWidth: '2px' },
  },
  '& .MuiInputLabel-root': { color: '#64748b' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#6d5cd8' },
};

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Please enter both username and password');
      return;
    }
    setLoading(true);
    const result = await login(form.username, form.password);
    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f3f1fd 0%, #ece9fb 50%, #f3f1fd 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blobs */}
      <Box sx={{
        position: 'absolute', top: '15%', left: '8%',
        width: 350, height: 350,
        background: 'radial-gradient(circle, rgba(109,92,216,0.18) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute', bottom: '10%', right: '8%',
        width: 280, height: 280,
        background: 'radial-gradient(circle, rgba(45,212,191,0.15) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: { xs: 3, sm: 5 },
          mx: 2,
          background: 'rgba(255,255,255,0.90)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(30,27,46,0.08)',
          borderRadius: '20px',
          boxShadow: '0 16px 40px rgba(30,27,46,0.12)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 3.5 }}>
          <Box sx={{
            width: 72, height: 72, margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #6d5cd8, #2dd4bf)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, boxShadow: '0 8px 32px rgba(109,92,216,0.4)',
          }}>
            🔐
          </Box>
          <Typography variant="h5" sx={{ color: '#1e1b2e', fontWeight: 700, mb: 0.5 }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Sign in to manage your portfolio
          </Typography>
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2, borderRadius: '10px',
              background: 'rgba(239,68,68,0.12)',
              color: '#dc2626',
              border: '1px solid rgba(239,68,68,0.25)',
              '& .MuiAlert-icon': { color: '#ef4444' },
            }}
          >
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          sx={{ ...inputSx, mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ color: '#64748b', fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={form.password}
          onChange={handleChange}
          sx={{ ...inputSx, mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: '#64748b', fontSize: 20 }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(v => !v)} sx={{ color: '#64748b' }} edge="end">
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          disabled={loading}
          sx={{
            background: loading ? 'rgba(109,92,216,0.5)' : 'linear-gradient(135deg, #6d5cd8, #5b4bc4)',
            color: '#fff',
            fontWeight: 700,
            py: 1.5,
            borderRadius: '10px',
            fontSize: '15px',
            textTransform: 'none',
            mb: 3,
            boxShadow: 'none',
            '&:hover': {
              background: 'linear-gradient(135deg, #5b4bc4, #4c3fae)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(109,92,216,0.4)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

        <Divider sx={{ borderColor: 'rgba(30,27,46,0.08)', mb: 2.5 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            Default credentials:{' '}
            <Box component="span" sx={{ color: '#6d5cd8', fontWeight: 600 }}>Admin</Box>
            {' / '}
            <Box component="span" sx={{ color: '#6d5cd8', fontWeight: 600 }}>Admin@123</Box>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
