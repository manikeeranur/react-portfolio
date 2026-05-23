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
    color: '#e2e8f0',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '10px',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(139,92,246,0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#8b5cf6', borderWidth: '2px' },
  },
  '& .MuiInputLabel-root': { color: '#94a3b8' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#8b5cf6' },
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
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
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
        background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)',
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
          background: 'rgba(30,41,59,0.90)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 3.5 }}>
          <Box sx={{
            width: 72, height: 72, margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #8b5cf6, #2dd4bf)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, boxShadow: '0 8px 32px rgba(139,92,246,0.4)',
          }}>
            🔐
          </Box>
          <Typography variant="h5" sx={{ color: '#e2e8f0', fontWeight: 700, mb: 0.5 }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            Sign in to manage your portfolio
          </Typography>
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2, borderRadius: '10px',
              background: 'rgba(239,68,68,0.12)',
              color: '#fca5a5',
              border: '1px solid rgba(239,68,68,0.25)',
              '& .MuiAlert-icon': { color: '#f87171' },
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
                <Person sx={{ color: '#94a3b8', fontSize: 20 }} />
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
                <Lock sx={{ color: '#94a3b8', fontSize: 20 }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(v => !v)} sx={{ color: '#94a3b8' }} edge="end">
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
            background: loading ? 'rgba(139,92,246,0.5)' : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: '#fff',
            fontWeight: 700,
            py: 1.5,
            borderRadius: '10px',
            fontSize: '15px',
            textTransform: 'none',
            mb: 3,
            boxShadow: 'none',
            '&:hover': {
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(139,92,246,0.4)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 2.5 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#64748b' }}>
            Default credentials:{' '}
            <Box component="span" sx={{ color: '#a78bfa', fontWeight: 600 }}>Admin</Box>
            {' / '}
            <Box component="span" sx={{ color: '#a78bfa', fontWeight: 600 }}>Admin@123</Box>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
