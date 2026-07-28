import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MyResumeContext } from '../context/MyResumeContext';
import profileSeedData from '../../data/profileSeedData';
import {
  Box, Container, Typography, Button, TextField, Tabs, Tab, Avatar,
  IconButton, Chip, Paper, Grid, Snackbar, Alert, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions, Checkbox,
  FormControlLabel, InputAdornment,
} from '@mui/material';
import {
  Edit, Save, Logout, Add, Delete, PhotoCamera, FileDownload, FileUpload,
  Person, Work, School, Code, Settings, Cancel, Visibility,
  VisibilityOff, Image as ImageIcon, Link as LinkIcon, GitHub, Layers,
} from '@mui/icons-material';

const genId = () => Math.random().toString(36).slice(2, 11);

// ─── Shared sx helpers ────────────────────────────────────────────────────────

const cardSx = {
  background: 'rgba(255,255,255,0.92)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(30,27,46,0.07)',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(30,27,46,0.06)',
};

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: '#1e1b2e',
    background: 'rgba(30,27,46,0.04)',
    borderRadius: '10px',
    '& fieldset': { borderColor: 'rgba(30,27,46,0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(109,92,216,0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#6d5cd8', borderWidth: '2px' },
  },
  '& .MuiInputLabel-root': { color: '#64748b' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#6d5cd8' },
  '& .MuiInputBase-input::placeholder': { color: '#94a3b8' },
};

const dialogPaperSx = {
  background: '#ffffff',
  border: '1px solid rgba(30,27,46,0.08)',
  borderRadius: '16px',
  color: '#1e1b2e',
};

const btnPrimary = {
  background: 'linear-gradient(135deg,#6d5cd8,#5b4bc4)',
  color: '#fff',
  fontWeight: 700,
  textTransform: 'none',
  borderRadius: '8px',
  '&:hover': { background: 'linear-gradient(135deg,#5b4bc4,#4c3fae)', boxShadow: '0 6px 20px rgba(109,92,216,0.4)' },
};

const btnOutline = {
  border: '1px solid rgba(109,92,216,0.5)',
  color: '#6d5cd8',
  textTransform: 'none',
  borderRadius: '8px',
  '&:hover': { background: 'rgba(109,92,216,0.1)', borderColor: '#6d5cd8' },
};

const btnDanger = {
  border: '1px solid rgba(239,68,68,0.4)',
  color: '#ef4444',
  textTransform: 'none',
  borderRadius: '8px',
  '&:hover': { background: 'rgba(239,68,68,0.1)', borderColor: '#ef4444' },
};

// ─── Blank templates ──────────────────────────────────────────────────────────

const blankExp  = () => ({ id: genId(), position: '', company: '', startDate: '', endDate: '', current: false, technology: '', project: '', description: '' });
const blankEdu  = () => ({ id: genId(), institution: '', degree: '', field: '', startDate: '', endDate: '', grade: '' });
const blankProj = () => ({ id: genId(), name: '', description: '', technologies: '', liveUrl: '', githubUrl: '', image: null });
const blankTech = () => ({ id: genId(), name: '', category: '', image: null });

// ─── TabPanel ────────────────────────────────────────────────────────────────

const TabPanel = ({ children, value, index }) => (
  <Box hidden={value !== index} sx={{ pt: 3 }}>
    {value === index && children}
  </Box>
);

// ═══════════════════════════════════════════════════════════════════════════════
//  PROFILE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const Profile = () => {
  const { logout, changePassword } = useAuth();
  const { profileData: profile, updateProfile } = useContext(MyResumeContext);
  const navigate = useNavigate();
  const imageInputRef = useRef(null);
  const importRef = useRef(null);

  const [activeTab, setActiveTab] = useState(0);
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });

  // Personal info edit state
  const [editPersonal, setEditPersonal] = useState(false);
  const [personalDraft, setPersonalDraft] = useState(profile.personalInfo);

  // Skill dialog
  const [skillDlg, setSkillDlg] = useState({ open: false, value: '', category: '', editId: null });

  // Experience dialog
  const [expDlg, setExpDlg] = useState({ open: false, data: null });

  // Education dialog
  const [eduDlg, setEduDlg] = useState({ open: false, data: null });

  // Project dialog
  const [projDlg, setProjDlg] = useState({ open: false, data: null });

  // Tech dialog
  const [techDlg, setTechDlg] = useState({ open: false, data: null });

  // Settings: change password
  const [pwDlg, setPwDlg] = useState({ open: false, current: '', next: '', confirm: '', show: false, err: '' });

  // Profile image URL input toggle
  const [showImgUrl, setShowImgUrl] = useState(false);
  const [imgUrlDraft, setImgUrlDraft] = useState('');

  // ── helpers ────────────────────────────────────────────────────────────────

  const toast = (msg, severity = 'success') => setSnack({ open: true, msg, severity });

  // Downloads a base64 image as a file and returns the public path string
  const downloadForPublic = (base64, folder, suggestedName) => {
    const [header, b64data] = base64.split(',');
    const mimeType = header.match(/:(.*?);/)[1];
    let ext = mimeType.split('/')[1];
    if (ext === 'jpeg') ext = 'jpg';
    if (ext === 'svg+xml') ext = 'svg';
    const safeName = suggestedName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const filename = `${safeName}.${ext}`;
    const path = `/images/${folder}/${filename}`;
    const byteChars = atob(b64data);
    const byteArr = new Uint8Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) byteArr[i] = byteChars.charCodeAt(i);
    const blob = new Blob([byteArr], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
    return path;
  };

  const save = async (updated) => {
    const result = await updateProfile(updated);
    if (result.success) {
      toast('Saved successfully!');
    } else {
      toast(result.error || 'Save failed', 'error');
    }
  };

  // ── Profile image upload ───────────────────────────────────────────────────

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      toast('Image too large. Max 3 MB.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const updated = { ...profile, profileImage: ev.target.result };
      save(updated);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // ── Personal info ─────────────────────────────────────────────────────────

  const savePersonal = () => {
    const updated = { ...profile, personalInfo: personalDraft };
    save(updated);
    setEditPersonal(false);
  };

  const cancelPersonal = () => {
    setPersonalDraft(profile.personalInfo);
    setEditPersonal(false);
  };

  // ── Skills ────────────────────────────────────────────────────────────────

  const openAddSkill = () => setSkillDlg({ open: true, value: '', category: '', editId: null });
  const openEditSkill = (sk) => setSkillDlg({ open: true, value: sk.name, category: sk.category || '', editId: sk.id });

  const saveSkill = () => {
    const name = skillDlg.value.trim();
    if (!name) return;
    const category = skillDlg.category.trim();
    let skills;
    if (skillDlg.editId) {
      skills = profile.skills.map(s => s.id === skillDlg.editId ? { ...s, name, category } : s);
    } else {
      skills = [...profile.skills, { id: genId(), name, category }];
    }
    save({ ...profile, skills });
    setSkillDlg({ open: false, value: '', category: '', editId: null });
  };

  const deleteSkill = (id) => {
    save({ ...profile, skills: profile.skills.filter(s => s.id !== id) });
  };

  // ── Experience ────────────────────────────────────────────────────────────

  const openAddExp = () => setExpDlg({ open: true, data: blankExp() });
  const openEditExp = (ex) => setExpDlg({ open: true, data: { ...ex } });

  const saveExp = () => {
    const d = expDlg.data;
    if (!d.company || !d.position) { toast('Company and Position are required', 'error'); return; }
    const exists = profile.experience.find(e => e.id === d.id);
    const experience = exists
      ? profile.experience.map(e => e.id === d.id ? d : e)
      : [...profile.experience, d];
    save({ ...profile, experience });
    setExpDlg({ open: false, data: null });
  };

  const deleteExp = (id) => save({ ...profile, experience: profile.experience.filter(e => e.id !== id) });

  // ── Education ─────────────────────────────────────────────────────────────

  const openAddEdu = () => setEduDlg({ open: true, data: blankEdu() });
  const openEditEdu = (ed) => setEduDlg({ open: true, data: { ...ed } });

  const saveEdu = () => {
    const d = eduDlg.data;
    if (!d.institution) { toast('Institution is required', 'error'); return; }
    const exists = profile.education.find(e => e.id === d.id);
    const education = exists
      ? profile.education.map(e => e.id === d.id ? d : e)
      : [...profile.education, d];
    save({ ...profile, education });
    setEduDlg({ open: false, data: null });
  };

  const deleteEdu = (id) => save({ ...profile, education: profile.education.filter(e => e.id !== id) });

  // ── Projects ──────────────────────────────────────────────────────────────

  const openAddProj = () => setProjDlg({ open: true, data: blankProj() });
  const openEditProj = (p) => setProjDlg({ open: true, data: { ...p } });

  const handleProjImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { toast('Image too large. Max 3 MB.', 'error'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setProjDlg(prev => ({ ...prev, data: { ...prev.data, image: ev.target.result } }));
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const saveProj = () => {
    const d = projDlg.data;
    if (!d.name) { toast('Project name is required', 'error'); return; }
    const exists = profile.projects.find(p => p.id === d.id);
    const projects = exists
      ? profile.projects.map(p => p.id === d.id ? d : p)
      : [...profile.projects, d];
    save({ ...profile, projects });
    setProjDlg({ open: false, data: null });
  };

  const deleteProj = (id) => save({ ...profile, projects: profile.projects.filter(p => p.id !== id) });

  // ── Techs Used ────────────────────────────────────────────────────────────

  const openAddTech  = () => setTechDlg({ open: true, data: blankTech() });
  const openEditTech = (t) => setTechDlg({ open: true, data: { ...t } });

  const handleTechImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1 * 1024 * 1024) { toast('Image too large. Max 1 MB.', 'error'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setTechDlg(prev => ({ ...prev, data: { ...prev.data, image: ev.target.result } }));
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const saveTech = () => {
    const d = techDlg.data;
    if (!d.name) { toast('Tech name is required', 'error'); return; }
    const techs = profile.techs || [];
    const exists = techs.find(t => t.id === d.id);
    const updated = exists ? techs.map(t => t.id === d.id ? d : t) : [...techs, d];
    save({ ...profile, techs: updated });
    setTechDlg({ open: false, data: null });
  };

  const deleteTech = (id) => save({ ...profile, techs: (profile.techs || []).filter(t => t.id !== id) });

  // ── Export / Import JSON ──────────────────────────────────────────────────

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio_profile.json';
    a.click();
    URL.revokeObjectURL(url);
    toast('Profile exported as JSON!');
  };

  const importJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        save({ ...profileSeedData, ...parsed });
        setPersonalDraft(parsed.personalInfo || profileSeedData.personalInfo);
      } catch {
        toast('Invalid JSON file', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // ── Change password ───────────────────────────────────────────────────────

  const handleChangePassword = async () => {
    const { current, next, confirm } = pwDlg;
    if (!current || !next || !confirm) { setPwDlg(p => ({ ...p, err: 'All fields required' })); return; }
    if (next !== confirm) { setPwDlg(p => ({ ...p, err: 'New passwords do not match' })); return; }
    if (next.length < 6) { setPwDlg(p => ({ ...p, err: 'Password must be at least 6 characters' })); return; }
    const result = await changePassword(current, next);
    if (result.success) {
      setPwDlg({ open: false, current: '', next: '', confirm: '', show: false, err: '' });
      toast('Password changed successfully!');
    } else {
      setPwDlg(p => ({ ...p, err: result.error }));
    }
  };

  // ── Logout ────────────────────────────────────────────────────────────────

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ═══════════════════════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <Box sx={{ minHeight: '100vh', background: '#f3f1fd', color: '#1e1b2e', pb: 6 }}>
      {/* ── Top bar ── */}
      <Box sx={{
        background: 'rgba(255,255,255,0.96)',
        borderBottom: '1px solid rgba(30,27,46,0.07)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 4px 30px rgba(30,27,46,0.08)',
        position: 'sticky', top: 0, zIndex: 100,
        px: { xs: 2, md: 4 }, py: 1.5,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg,#6d5cd8,#2dd4bf)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>👤</Box>
          <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#1e1b2e' }}>
            Profile Manager
          </Typography>
        </Box>
        <Button
          startIcon={<Logout />}
          onClick={handleLogout}
          sx={{ ...btnDanger, px: 2, py: 0.75, fontSize: 13 }}
        >
          Logout
        </Button>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* ── Profile header card ── */}
        <Paper sx={{ ...cardSx, overflow: 'hidden', mb: 3 }}>
          <Box sx={{ height: 4, background: 'linear-gradient(90deg,#6d5cd8,#2dd4bf,#ec4899)' }} />
          <Box sx={{ p: 3, display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
          {/* Avatar with upload */}
          <Box sx={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={profile.profileImage || undefined}
                sx={{
                  width: 110, height: 110,
                  background: 'linear-gradient(135deg,#6d5cd8,#2dd4bf)',
                  fontSize: 42, border: '3px solid rgba(109,92,216,0.4)',
                  cursor: 'pointer',
                }}
                onClick={() => imageInputRef.current?.click()}
              >
                {!profile.profileImage && (profile.personalInfo.name?.[0]?.toUpperCase() || '?')}
              </Avatar>
              <Tooltip title="Upload photo from device">
                <IconButton
                  size="small"
                  onClick={() => imageInputRef.current?.click()}
                  sx={{
                    position: 'absolute', bottom: 2, right: 2,
                    background: '#6d5cd8', color: '#fff', width: 28, height: 28,
                    '&:hover': { background: '#5b4bc4' },
                  }}
                >
                  <PhotoCamera sx={{ fontSize: 14 }} />
                </IconButton>
              </Tooltip>
              <input ref={imageInputRef} type="file" accept="image/*" hidden onChange={handleProfileImage} />
            </Box>

            {/* Path / URL option */}
            {!showImgUrl ? (
              <Button
                size="small"
                onClick={() => { setImgUrlDraft(profile.profileImage?.startsWith('data:') ? '' : (profile.profileImage || '')); setShowImgUrl(true); }}
                sx={{ color: '#94a3b8', fontSize: 11, textTransform: 'none', p: 0, minWidth: 0 }}
              >
                Use public folder path
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mt: 0.5 }}>
                <TextField
                  size="small" autoFocus
                  placeholder="/images/profile/photo.jpg"
                  value={imgUrlDraft}
                  onChange={e => setImgUrlDraft(e.target.value)}
                  sx={{ ...inputSx, width: 200, '& .MuiInputBase-input': { fontSize: 12, py: 0.75 } }}
                />
                <IconButton size="small"
                  onClick={() => {
                    if (imgUrlDraft.trim()) {
                      const updated = { ...profile, profileImage: imgUrlDraft.trim() };
                      save(updated);
                    }
                    setShowImgUrl(false);
                  }}
                  sx={{ color: '#6d5cd8', background: 'rgba(109,92,216,0.15)', '&:hover': { background: 'rgba(109,92,216,0.25)' } }}
                >
                  <Save sx={{ fontSize: 16 }} />
                </IconButton>
                <IconButton size="small" onClick={() => setShowImgUrl(false)}
                  sx={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)' }}>
                  <Cancel sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            )}
            {/* Show path if using public folder */}
            {profile.profileImage && !profile.profileImage.startsWith('data:') && (
              <Typography sx={{ color: '#2dd4bf', fontSize: 10, textAlign: 'center', maxWidth: 130, wordBreak: 'break-all' }}>
                {profile.profileImage}
              </Typography>
            )}
            {/* Download button when base64 uploaded */}
            {profile.profileImage?.startsWith('data:') && (
              <Button
                size="small"
                startIcon={<FileDownload sx={{ fontSize: 13 }} />}
                onClick={() => {
                  const path = downloadForPublic(profile.profileImage, 'profile', 'profile-photo');
                  const updated = { ...profile, profileImage: path };
                  save(updated);
                  toast(`File downloaded! FTP it to public/images/profile/ on your server. Path set to: ${path}`, 'success');
                }}
                sx={{ color: '#2dd4bf', fontSize: 11, textTransform: 'none', p: 0.5, border: '1px solid rgba(45,212,191,0.3)', borderRadius: 1 }}
              >
                Save to public/images/
              </Button>
            )}
          </Box>

          {/* Name & title */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e1b2e', mb: 0.25 }}>
              {profile.personalInfo.name || 'Your Name'}
            </Typography>
            <Typography sx={{ color: '#6d5cd8', fontSize: 15, mb: 0.5 }}>
              {profile.personalInfo.title || 'Your Title'}
            </Typography>
            <Typography sx={{ color: '#64748b', fontSize: 13 }}>
              {profile.personalInfo.location || 'Location'}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
              {[
                { label: 'Skills',     count: profile.skills?.length    || 0, color: '#6d5cd8' },
                { label: 'Experience', count: profile.experience?.length || 0, color: '#2dd4bf' },
                { label: 'Education',  count: profile.education?.length  || 0, color: '#f59e0b' },
                { label: 'Projects',   count: profile.projects?.length   || 0, color: '#ec4899' },
              ].map(({ label, count, color }) => (
                <Box key={label} sx={{
                  display: 'flex', alignItems: 'center', gap: 0.75,
                  background: 'rgba(30,27,46,0.05)', borderRadius: 2,
                  px: 1.5, py: 0.5, border: `1px solid ${color}33`,
                }}>
                  <Typography sx={{ color, fontSize: 15, fontWeight: 700 }}>{count}</Typography>
                  <Typography sx={{ color: '#94a3b8', fontSize: 12 }}>{label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Export / Import */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button startIcon={<FileDownload />} onClick={exportJSON} sx={{ ...btnOutline, fontSize: 13 }}>
              Export JSON
            </Button>
            <Button
              startIcon={<FileUpload />}
              onClick={() => importRef.current?.click()}
              sx={{ ...btnOutline, fontSize: 13 }}
            >
              Import JSON
            </Button>
            <input ref={importRef} type="file" accept=".json" hidden onChange={importJSON} />
          </Box>
          </Box>
        </Paper>

        {/* ── Tabs ── */}
        <Paper sx={{ ...cardSx, overflow: 'hidden' }}>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: '1px solid rgba(30,27,46,0.07)',
              '& .MuiTab-root': { color: '#64748b', textTransform: 'none', fontSize: 14, fontWeight: 500, minWidth: 'auto', px: 2 },
              '& .Mui-selected': { color: '#6d5cd8 !important' },
              '& .MuiTabs-indicator': { background: 'linear-gradient(90deg,#6d5cd8,#2dd4bf)', height: 3 },
            }}
          >
            <Tab icon={<Person sx={{ fontSize: 18 }} />} iconPosition="start" label="Personal" />
            <Tab icon={<Code sx={{ fontSize: 18 }} />} iconPosition="start" label="Skills" />
            <Tab icon={<Work sx={{ fontSize: 18 }} />} iconPosition="start" label="Experience" />
            <Tab icon={<School sx={{ fontSize: 18 }} />} iconPosition="start" label="Education" />
            <Tab icon={<ImageIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Projects" />
            <Tab icon={<Layers sx={{ fontSize: 18 }} />} iconPosition="start" label="Techs Used" />
            <Tab icon={<Settings sx={{ fontSize: 18 }} />} iconPosition="start" label="Settings" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* ═══ TAB 0 — Personal Info ═══ */}
            <TabPanel value={activeTab} index={0}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#1e1b2e' }}>Personal Information</Typography>
                {!editPersonal
                  ? <Button startIcon={<Edit />} onClick={() => { setPersonalDraft(profile.personalInfo); setEditPersonal(true); }} sx={btnOutline}>Edit</Button>
                  : <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button startIcon={<Cancel />} onClick={cancelPersonal} sx={btnDanger}>Cancel</Button>
                      <Button startIcon={<Save />} onClick={savePersonal} sx={btnPrimary}>Save</Button>
                    </Box>
                }
              </Box>

              {editPersonal ? (
                <Grid container spacing={2}>
                  {[
                    { label: 'Full Name', key: 'name' },
                    { label: 'Professional Title', key: 'title' },
                    { label: 'Email', key: 'email' },
                    { label: 'Phone', key: 'phone' },
                    { label: 'Location', key: 'location' },
                    { label: 'Website URL', key: 'website' },
                    { label: 'GitHub URL', key: 'github' },
                    { label: 'LinkedIn URL', key: 'linkedin' },
                  ].map(({ label, key }) => (
                    <Grid item xs={12} sm={6} key={key}>
                      <TextField
                        fullWidth label={label} value={personalDraft[key] || ''}
                        onChange={e => setPersonalDraft(p => ({ ...p, [key]: e.target.value }))}
                        sx={inputSx} size="small"
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth multiline rows={4} label="Bio / About Me"
                      value={personalDraft.bio || ''}
                      onChange={e => setPersonalDraft(p => ({ ...p, bio: e.target.value }))}
                      sx={inputSx}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  {[
                    { label: 'Full Name', val: profile.personalInfo.name },
                    { label: 'Professional Title', val: profile.personalInfo.title },
                    { label: 'Email', val: profile.personalInfo.email },
                    { label: 'Phone', val: profile.personalInfo.phone },
                    { label: 'Location', val: profile.personalInfo.location },
                    { label: 'Website', val: profile.personalInfo.website },
                    { label: 'GitHub', val: profile.personalInfo.github },
                    { label: 'LinkedIn', val: profile.personalInfo.linkedin },
                  ].map(({ label, val }) => (
                    <Grid item xs={12} sm={6} key={label}>
                      <Box>
                        <Typography sx={{ color: '#94a3b8', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, mb: 0.25 }}>{label}</Typography>
                        <Typography sx={{ color: val ? '#1e1b2e' : '#94a3b8', fontSize: 14 }}>{val || '—'}</Typography>
                      </Box>
                    </Grid>
                  ))}
                  {profile.personalInfo.bio && (
                    <Grid item xs={12}>
                      <Box>
                        <Typography sx={{ color: '#94a3b8', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, mb: 0.25 }}>Bio</Typography>
                        <Typography sx={{ color: '#1e1b2e', fontSize: 14, lineHeight: 1.7 }}>{profile.personalInfo.bio}</Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              )}
            </TabPanel>

            {/* ═══ TAB 1 — Skills ═══ */}
            <TabPanel value={activeTab} index={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#1e1b2e' }}>Skills</Typography>
                  <Typography sx={{ color: '#94a3b8', fontSize: 12, mt: 0.25 }}>
                    {profile.skills.length} skill{profile.skills.length !== 1 ? 's' : ''} — grouped by category in the resume
                  </Typography>
                </Box>
                <Button startIcon={<Add />} onClick={openAddSkill} sx={btnPrimary}>Add Skill</Button>
              </Box>
              {profile.skills.length === 0 ? (
                <EmptyState label="No skills added yet" />
              ) : (() => {
                const hasCat = profile.skills.some(s => s.category);
                if (!hasCat) return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    {profile.skills.map(sk => (
                      <Chip key={sk.id} label={sk.name} onClick={() => openEditSkill(sk)} onDelete={() => deleteSkill(sk.id)}
                        sx={{ background: 'rgba(109,92,216,0.15)', border: '1px solid rgba(109,92,216,0.35)', color: '#5b4bc4', fontSize: 14, cursor: 'pointer', '& .MuiChip-deleteIcon': { color: '#5b4bc4', '&:hover': { color: '#ef4444' } }, '&:hover': { background: 'rgba(109,92,216,0.25)' } }}
                      />
                    ))}
                  </Box>
                );
                const groups = {};
                profile.skills.forEach(s => {
                  const cat = s.category || 'Uncategorized';
                  if (!groups[cat]) groups[cat] = [];
                  groups[cat].push(s);
                });
                return Object.entries(groups).map(([cat, items]) => (
                  <Box key={cat} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                      <Typography sx={{ color: '#94a3b8', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, whiteSpace: 'nowrap' }}>
                        {cat}
                      </Typography>
                      <Chip label={items.length} size="small"
                        sx={{ background: 'rgba(109,92,216,0.2)', color: '#6d5cd8', fontSize: 11, height: 18, '& .MuiChip-label': { px: 1 } }}
                      />
                      <Box sx={{ flex: 1, height: '1px', background: 'rgba(30,27,46,0.06)' }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                      {items.map(sk => (
                        <Chip key={sk.id} label={sk.name} onClick={() => openEditSkill(sk)} onDelete={() => deleteSkill(sk.id)}
                          sx={{ background: 'rgba(109,92,216,0.15)', border: '1px solid rgba(109,92,216,0.35)', color: '#5b4bc4', fontSize: 14, cursor: 'pointer', '& .MuiChip-deleteIcon': { color: '#5b4bc4', '&:hover': { color: '#ef4444' } }, '&:hover': { background: 'rgba(109,92,216,0.25)' } }}
                        />
                      ))}
                    </Box>
                  </Box>
                ));
              })()}
            </TabPanel>

            {/* ═══ TAB 2 — Experience ═══ */}
            <TabPanel value={activeTab} index={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 16 }}>Work Experience</Typography>
                <Button startIcon={<Add />} onClick={openAddExp} sx={btnPrimary}>Add Experience</Button>
              </Box>
              {profile.experience.length === 0 ? <EmptyState label="No experience added yet" /> : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {profile.experience.map(ex => (
                    <Paper key={ex.id} sx={{ ...cardSx, p: 2.5, borderLeft: '3px solid #6d5cd8' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontWeight: 700, color: '#6d5cd8', fontSize: 15 }}>{ex.position}</Typography>
                          <Typography sx={{ color: '#1e1b2e', fontSize: 14, fontWeight: 600 }}>{ex.company}</Typography>
                          <Typography sx={{ color: '#94a3b8', fontSize: 12, mt: 0.5 }}>
                            {ex.startDate} — {ex.current ? 'Present' : ex.endDate}
                          </Typography>
                          {ex.technology && (
                            <Box sx={{ mt: 1 }}>
                              <Typography component="span" sx={{ color: '#94a3b8', fontSize: 12, fontWeight: 600 }}>Technology: </Typography>
                              <Typography component="span" sx={{ color: '#64748b', fontSize: 12 }}>{ex.technology}</Typography>
                            </Box>
                          )}
                          {ex.project && (
                            <Box sx={{ mt: 0.5 }}>
                              <Typography component="span" sx={{ color: '#94a3b8', fontSize: 12, fontWeight: 600 }}>Project: </Typography>
                              <Typography component="span" sx={{ color: '#2dd4bf', fontSize: 12 }}>{ex.project}</Typography>
                            </Box>
                          )}
                          {ex.description && (
                            <Typography sx={{ color: '#64748b', fontSize: 13, mt: 1, lineHeight: 1.6 }}>{ex.description}</Typography>
                          )}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                          <IconButton size="small" onClick={() => openEditExp(ex)} sx={{ color: '#6d5cd8', '&:hover': { background: 'rgba(109,92,216,0.15)' } }}><Edit fontSize="small" /></IconButton>
                          <IconButton size="small" onClick={() => deleteExp(ex.id)} sx={{ color: '#ef4444', '&:hover': { background: 'rgba(239,68,68,0.1)' } }}><Delete fontSize="small" /></IconButton>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              )}
            </TabPanel>

            {/* ═══ TAB 3 — Education ═══ */}
            <TabPanel value={activeTab} index={3}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 16 }}>Education</Typography>
                <Button startIcon={<Add />} onClick={openAddEdu} sx={btnPrimary}>Add Education</Button>
              </Box>
              {profile.education.length === 0 ? <EmptyState label="No education added yet" /> : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {profile.education.map(ed => (
                    <Paper key={ed.id} sx={{ ...cardSx, p: 2.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                        <Box>
                          <Typography sx={{ fontWeight: 700, color: '#6d5cd8', fontSize: 15 }}>{ed.degree} {ed.field && `— ${ed.field}`}</Typography>
                          <Typography sx={{ color: '#1e1b2e', fontSize: 14, fontWeight: 600 }}>{ed.institution}</Typography>
                          <Typography sx={{ color: '#94a3b8', fontSize: 12, mt: 0.5 }}>
                            {ed.startDate} — {ed.endDate}
                            {ed.grade && <Box component="span" sx={{ ml: 1.5, color: '#2dd4bf' }}>Grade: {ed.grade}</Box>}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                          <IconButton size="small" onClick={() => openEditEdu(ed)} sx={{ color: '#6d5cd8', '&:hover': { background: 'rgba(109,92,216,0.15)' } }}><Edit fontSize="small" /></IconButton>
                          <IconButton size="small" onClick={() => deleteEdu(ed.id)} sx={{ color: '#ef4444', '&:hover': { background: 'rgba(239,68,68,0.1)' } }}><Delete fontSize="small" /></IconButton>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              )}
            </TabPanel>

            {/* ═══ TAB 4 — Projects ═══ */}
            <TabPanel value={activeTab} index={4}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 16 }}>Projects</Typography>
                <Button startIcon={<Add />} onClick={openAddProj} sx={btnPrimary}>Add Project</Button>
              </Box>
              {profile.projects.length === 0 ? <EmptyState label="No projects added yet" /> : (
                <Grid container spacing={2}>
                  {profile.projects.map(p => (
                    <Grid item xs={12} sm={6} md={4} key={p.id}>
                      <Paper sx={{ ...cardSx, overflow: 'hidden', height: '100%' }}>
                        {p.image && (
                          <Box component="img" src={p.image} alt={p.name}
                            sx={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }}
                          />
                        )}
                        <Box sx={{ p: 2 }}>
                          <Typography sx={{ fontWeight: 700, color: '#6d5cd8', mb: 0.5 }}>{p.name}</Typography>
                          {p.description && (
                            <Typography sx={{ color: '#64748b', fontSize: 13, mb: 1, lineHeight: 1.5 }}>{p.description}</Typography>
                          )}
                          {p.technologies && (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                              {p.technologies.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                                <Chip key={t} label={t} size="small"
                                  sx={{ background: 'rgba(45,212,191,0.1)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.3)', fontSize: 11 }}
                                />
                              ))}
                            </Box>
                          )}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              {p.liveUrl && <Tooltip title="Live demo"><IconButton size="small" href={p.liveUrl} target="_blank" sx={{ color: '#2dd4bf' }}><LinkIcon fontSize="small" /></IconButton></Tooltip>}
                              {p.githubUrl && <Tooltip title="GitHub"><IconButton size="small" href={p.githubUrl} target="_blank" sx={{ color: '#64748b' }}><GitHub fontSize="small" /></IconButton></Tooltip>}
                            </Box>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              <IconButton size="small" onClick={() => openEditProj(p)} sx={{ color: '#6d5cd8', '&:hover': { background: 'rgba(109,92,216,0.15)' } }}><Edit fontSize="small" /></IconButton>
                              <IconButton size="small" onClick={() => deleteProj(p.id)} sx={{ color: '#ef4444', '&:hover': { background: 'rgba(239,68,68,0.1)' } }}><Delete fontSize="small" /></IconButton>
                            </Box>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </TabPanel>

            {/* ═══ TAB 5 — Techs Used ═══ */}
            <TabPanel value={activeTab} index={5}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 16 }}>Techs Used</Typography>
                  <Typography sx={{ color: '#94a3b8', fontSize: 12, mt: 0.25 }}>
                    Shown on the website's "Techs Used" section — separate from resume skills
                  </Typography>
                </Box>
                <Button startIcon={<Add />} onClick={openAddTech} sx={btnPrimary}>Add Tech</Button>
              </Box>

              {/* Group by category for preview */}
              {(() => {
                const techs = profile.techs || [];
                if (techs.length === 0) return <EmptyState label="No techs added yet" />;
                const groups = techs.reduce((acc, t) => {
                  const cat = t.category || 'Uncategorized';
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(t);
                  return acc;
                }, {});
                return Object.entries(groups).map(([cat, items]) => (
                  <Box key={cat} sx={{ mb: 3 }}>
                    <Typography sx={{ color: '#94a3b8', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, mb: 1.5 }}>
                      {cat}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                      {items.map(t => (
                        <Paper key={t.id} sx={{
                          ...cardSx, px: 2, py: 1.25,
                          display: 'flex', alignItems: 'center', gap: 1.5,
                          borderLeft: '2px solid #6d5cd8',
                        }}>
                          {t.image
                            ? <Box component="img" src={t.image} alt={t.name} sx={{ width: 28, height: 28, objectFit: 'contain', borderRadius: 1 }} />
                            : <Box sx={{
                                width: 28, height: 28, borderRadius: 1,
                                background: 'linear-gradient(135deg,#6d5cd8,#2dd4bf)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#fff', fontWeight: 800, fontSize: 13,
                              }}>{t.name[0]?.toUpperCase()}</Box>
                          }
                          <Typography sx={{ color: '#1e1b2e', fontSize: 13, fontWeight: 500 }}>{t.name}</Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, ml: 0.5 }}>
                            <IconButton size="small" onClick={() => openEditTech(t)} sx={{ color: '#6d5cd8', p: 0.25, '&:hover': { background: 'rgba(109,92,216,0.15)' } }}><Edit sx={{ fontSize: 14 }} /></IconButton>
                            <IconButton size="small" onClick={() => deleteTech(t.id)} sx={{ color: '#ef4444', p: 0.25, '&:hover': { background: 'rgba(239,68,68,0.1)' } }}><Delete sx={{ fontSize: 14 }} /></IconButton>
                          </Box>
                        </Paper>
                      ))}
                    </Box>
                  </Box>
                ));
              })()}
            </TabPanel>

            {/* ═══ TAB 6 — Settings ═══ */}
            <TabPanel value={activeTab} index={6}>
              <Typography sx={{ fontWeight: 700, fontSize: 16, mb: 3 }}>Settings</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper sx={{ ...cardSx, p: 2.5, textAlign: 'center' }}>
                    <Box sx={{ fontSize: 36, mb: 1 }}>🔒</Box>
                    <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Change Password</Typography>
                    <Typography sx={{ color: '#64748b', fontSize: 13, mb: 2 }}>Update your login password</Typography>
                    <Button onClick={() => setPwDlg(p => ({ ...p, open: true }))} sx={btnOutline} fullWidth>Change Password</Button>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper sx={{ ...cardSx, p: 2.5, textAlign: 'center' }}>
                    <Box sx={{ fontSize: 36, mb: 1 }}>📥</Box>
                    <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Export Profile</Typography>
                    <Typography sx={{ color: '#64748b', fontSize: 13, mb: 2 }}>Download your profile as JSON</Typography>
                    <Button startIcon={<FileDownload />} onClick={exportJSON} sx={btnOutline} fullWidth>Export JSON</Button>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper sx={{ ...cardSx, p: 2.5, textAlign: 'center' }}>
                    <Box sx={{ fontSize: 36, mb: 1 }}>📤</Box>
                    <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Import Profile</Typography>
                    <Typography sx={{ color: '#64748b', fontSize: 13, mb: 2 }}>Restore from a JSON backup</Typography>
                    <Button startIcon={<FileUpload />} onClick={() => importRef.current?.click()} sx={btnOutline} fullWidth>Import JSON</Button>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper sx={{ ...cardSx, p: 2.5, textAlign: 'center' }}>
                    <Box sx={{ fontSize: 36, mb: 1 }}>🔄</Box>
                    <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Reset to Default</Typography>
                    <Typography sx={{ color: '#64748b', fontSize: 13, mb: 2 }}>Reload all original portfolio data</Typography>
                    <Button
                      sx={{ ...btnDanger, width: '100%' }}
                      onClick={() => {
                        updateProfile({ ...profileSeedData });
                        setPersonalDraft(profileSeedData.personalInfo);
                        toast('Profile reset to original data!', 'info');
                      }}
                    >
                      Reset to Defaults
                    </Button>
                  </Paper>
                </Grid>

                {/* Backend status */}
                <Grid item xs={12}>
                  <Paper sx={{ ...cardSx, p: 3, border: '1px solid rgba(45,212,191,0.25)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{ fontSize: 36 }}>☁️</Box>
                      <Box>
                        <Typography sx={{ fontWeight: 700, mb: 0.5, color: '#2dd4bf' }}>
                          MongoDB Atlas — Live Backend
                        </Typography>
                        <Typography sx={{ color: '#64748b', fontSize: 13, lineHeight: 1.7 }}>
                          All profile changes are saved directly to MongoDB Atlas in real time.
                          Every visitor sees the latest data instantly — no file uploads or deployments needed.
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Paper>
      </Container>

      {/* ═══════════════════════════════════════════════════════════════════════
          DIALOGS
      ═══════════════════════════════════════════════════════════════════════ */}

      {/* ── Tech dialog ── */}
      <Dialog open={techDlg.open} onClose={() => setTechDlg({ open: false, data: null })} PaperProps={{ sx: dialogPaperSx }} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ borderBottom: '1px solid rgba(30,27,46,0.07)', pb: 1.5 }}>
          {techDlg.data?.name ? 'Edit Tech' : 'Add Tech'}
        </DialogTitle>
        <DialogContent sx={{ pt: '16px !important' }}>
          {techDlg.data && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth autoFocus label="Tech Name" value={techDlg.data.name}
                onChange={e => setTechDlg(p => ({ ...p, data: { ...p.data, name: e.target.value } }))}
                sx={inputSx} size="small" placeholder="e.g. React Js, TypeScript"
              />
              <TextField
                fullWidth label="Category" value={techDlg.data.category}
                onChange={e => setTechDlg(p => ({ ...p, data: { ...p.data, category: e.target.value } }))}
                sx={inputSx} size="small" placeholder="e.g. Frontend Technologies, Tools & Platforms"
              />

              {/* Icon — upload OR public folder path */}
              <Box sx={{ border: '1px solid rgba(30,27,46,0.08)', borderRadius: 2, p: 2 }}>
                <Typography sx={{ color: '#64748b', fontSize: 12, mb: 1.5, fontWeight: 600 }}>
                  Icon (optional — auto-matched by name if empty)
                </Typography>

                {/* Preview */}
                {techDlg.data.image && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Box component="img" src={techDlg.data.image} alt="preview"
                      sx={{ width: 44, height: 44, objectFit: 'contain', borderRadius: 1, border: '1px solid rgba(30,27,46,0.12)', p: 0.5, background: 'rgba(30,27,46,0.04)' }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                    <Box sx={{ flex: 1 }}>
                      {techDlg.data.image.startsWith('data:') ? (
                        <>
                          <Typography sx={{ color: '#f59e0b', fontSize: 11, mb: 0.5 }}>Uploaded — stored as base64</Typography>
                          <Button
                            size="small"
                            startIcon={<FileDownload sx={{ fontSize: 12 }} />}
                            onClick={() => {
                              const name = techDlg.data.name || 'tech-icon';
                              const path = downloadForPublic(techDlg.data.image, 'techs', name);
                              setTechDlg(p => ({ ...p, data: { ...p.data, image: path } }));
                              toast(`Downloaded! FTP to public/images/techs/ → path set: ${path}`, 'success');
                            }}
                            sx={{ color: '#2dd4bf', fontSize: 11, textTransform: 'none', p: '2px 8px', border: '1px solid rgba(45,212,191,0.35)', borderRadius: 1, mr: 1 }}
                          >
                            Save to public/images/
                          </Button>
                        </>
                      ) : (
                        <Typography sx={{ color: '#2dd4bf', fontSize: 11, wordBreak: 'break-all' }}>
                          {techDlg.data.image}
                        </Typography>
                      )}
                      <Button size="small" onClick={() => setTechDlg(p => ({ ...p, data: { ...p.data, image: null } }))}
                        sx={{ color: '#ef4444', fontSize: 11, p: 0, minWidth: 0, textTransform: 'none', mt: 0.25, display: 'block' }}>
                        Remove
                      </Button>
                    </Box>
                  </Box>
                )}

                {/* Option A: Upload file → base64 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <label>
                    <input type="file" accept="image/*,.svg" hidden onChange={handleTechImage} />
                    <Button component="span" startIcon={<PhotoCamera />} sx={{ ...btnOutline, fontSize: 12 }}>
                      Upload Image
                    </Button>
                  </label>
                  <Typography sx={{ color: '#94a3b8', fontSize: 11 }}>Max 1 MB · stored as base64</Typography>
                </Box>

                {/* Divider */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Box sx={{ flex: 1, height: '1px', background: 'rgba(30,27,46,0.07)' }} />
                  <Typography sx={{ color: '#94a3b8', fontSize: 11 }}>or use public folder path</Typography>
                  <Box sx={{ flex: 1, height: '1px', background: 'rgba(30,27,46,0.07)' }} />
                </Box>

                {/* Option B: Path to file in public/images/ */}
                <TextField
                  fullWidth
                  label="Image path / URL"
                  placeholder="/images/techs/react.svg"
                  value={techDlg.data.image && !techDlg.data.image.startsWith('data:') ? techDlg.data.image : ''}
                  onChange={e => setTechDlg(p => ({ ...p, data: { ...p.data, image: e.target.value || null } }))}
                  sx={inputSx} size="small"
                  helperText={
                    <span style={{ color: '#94a3b8', fontSize: 11 }}>
                      FTP your image to <span style={{ color: '#6d5cd8' }}>public/images/techs/</span> then type the path here
                    </span>
                  }
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setTechDlg({ open: false, data: null })} sx={btnDanger}>Cancel</Button>
          <Button onClick={saveTech} sx={btnPrimary}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* ── Skill dialog ── */}
      <Dialog open={skillDlg.open} onClose={() => setSkillDlg(p => ({ ...p, open: false }))} PaperProps={{ sx: dialogPaperSx }} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ borderBottom: '1px solid rgba(30,27,46,0.07)', pb: 1.5 }}>
          {skillDlg.editId ? 'Edit Skill' : 'Add Skill'}
        </DialogTitle>
        <DialogContent sx={{ pt: '16px !important', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth autoFocus label="Skill name" value={skillDlg.value}
            onChange={e => setSkillDlg(p => ({ ...p, value: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && saveSkill()}
            sx={inputSx} placeholder="e.g. React, Python, Figma"
          />
          <TextField
            fullWidth label="Category (for resume grouping)" value={skillDlg.category}
            onChange={e => setSkillDlg(p => ({ ...p, category: e.target.value }))}
            sx={inputSx} placeholder="e.g. Language, Frameworks & Libraries"
            helperText={<span style={{ color: '#94a3b8', fontSize: 11 }}>Groups skills together in the resume's Technical Skills section</span>}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setSkillDlg(p => ({ ...p, open: false }))} sx={btnDanger}>Cancel</Button>
          <Button onClick={saveSkill} sx={btnPrimary}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* ── Experience dialog ── */}
      <Dialog open={expDlg.open} onClose={() => setExpDlg({ open: false, data: null })} PaperProps={{ sx: dialogPaperSx }} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ borderBottom: '1px solid rgba(30,27,46,0.07)', pb: 1.5 }}>
          {expDlg.data?.company ? 'Edit Experience' : 'Add Experience'}
        </DialogTitle>
        <DialogContent sx={{ pt: '16px !important' }}>
          {expDlg.data && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Job Title / Position" size="small"
                  value={expDlg.data.position || ''}
                  onChange={e => setExpDlg(p => ({ ...p, data: { ...p.data, position: e.target.value } }))}
                  sx={inputSx}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Company / Organization" size="small"
                  value={expDlg.data.company || ''}
                  onChange={e => setExpDlg(p => ({ ...p, data: { ...p.data, company: e.target.value } }))}
                  sx={inputSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Start Date (e.g. Sep 2023)" size="small"
                  value={expDlg.data.startDate || ''}
                  onChange={e => setExpDlg(p => ({ ...p, data: { ...p.data, startDate: e.target.value } }))}
                  sx={inputSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="End Date" size="small"
                  value={expDlg.data.endDate || ''}
                  onChange={e => setExpDlg(p => ({ ...p, data: { ...p.data, endDate: e.target.value } }))}
                  sx={inputSx}
                  disabled={expDlg.data.current}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={expDlg.data.current || false}
                      onChange={e => setExpDlg(p => ({ ...p, data: { ...p.data, current: e.target.checked, endDate: e.target.checked ? '' : p.data.endDate } }))}
                      sx={{ color: '#6d5cd8', '&.Mui-checked': { color: '#6d5cd8' } }}
                    />
                  }
                  label={<Typography sx={{ color: '#64748b', fontSize: 14 }}>Currently working here</Typography>}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Technology Stack" size="small"
                  placeholder="React.js, TypeScript, MUI"
                  value={expDlg.data.technology || ''}
                  onChange={e => setExpDlg(p => ({ ...p, data: { ...p.data, technology: e.target.value } }))}
                  sx={inputSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Project Name" size="small"
                  value={expDlg.data.project || ''}
                  onChange={e => setExpDlg(p => ({ ...p, data: { ...p.data, project: e.target.value } }))}
                  sx={inputSx}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth multiline rows={4} label="Description / Responsibilities"
                  value={expDlg.data.description || ''}
                  onChange={e => setExpDlg(p => ({ ...p, data: { ...p.data, description: e.target.value } }))}
                  sx={inputSx}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setExpDlg({ open: false, data: null })} sx={btnDanger}>Cancel</Button>
          <Button onClick={saveExp} sx={btnPrimary}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* ── Education dialog ── */}
      <Dialog open={eduDlg.open} onClose={() => setEduDlg({ open: false, data: null })} PaperProps={{ sx: dialogPaperSx }} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ borderBottom: '1px solid rgba(30,27,46,0.07)', pb: 1.5 }}>
          {eduDlg.data?.institution ? 'Edit Education' : 'Add Education'}
        </DialogTitle>
        <DialogContent sx={{ pt: '16px !important' }}>
          {eduDlg.data && (
            <Grid container spacing={2}>
              {[
                { label: 'Institution / University', key: 'institution', sm: 12 },
                { label: 'Degree (e.g. B.Tech, MBA)', key: 'degree', sm: 6 },
                { label: 'Field of Study', key: 'field', sm: 6 },
                { label: 'Start Date', key: 'startDate', sm: 6 },
                { label: 'End Date', key: 'endDate', sm: 6 },
                { label: 'Grade / CGPA / Percentage', key: 'grade', sm: 12 },
              ].map(({ label, key, sm }) => (
                <Grid item xs={12} sm={sm || 6} key={key}>
                  <TextField
                    fullWidth label={label} value={eduDlg.data[key] || ''}
                    onChange={e => setEduDlg(p => ({ ...p, data: { ...p.data, [key]: e.target.value } }))}
                    sx={inputSx} size="small"
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setEduDlg({ open: false, data: null })} sx={btnDanger}>Cancel</Button>
          <Button onClick={saveEdu} sx={btnPrimary}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* ── Project dialog ── */}
      <Dialog open={projDlg.open} onClose={() => setProjDlg({ open: false, data: null })} PaperProps={{ sx: dialogPaperSx }} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ borderBottom: '1px solid rgba(30,27,46,0.07)', pb: 1.5 }}>
          {projDlg.data?.name ? 'Edit Project' : 'Add Project'}
        </DialogTitle>
        <DialogContent sx={{ pt: '16px !important' }}>
          {projDlg.data && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="Project Name" value={projDlg.data.name || ''}
                  onChange={e => setProjDlg(p => ({ ...p, data: { ...p.data, name: e.target.value } }))}
                  sx={inputSx} size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth multiline rows={3} label="Description"
                  value={projDlg.data.description || ''}
                  onChange={e => setProjDlg(p => ({ ...p, data: { ...p.data, description: e.target.value } }))}
                  sx={inputSx}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="Technologies (comma separated)"
                  placeholder="React, Node.js, MongoDB"
                  value={projDlg.data.technologies || ''}
                  onChange={e => setProjDlg(p => ({ ...p, data: { ...p.data, technologies: e.target.value } }))}
                  sx={inputSx} size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth label="Live URL" value={projDlg.data.liveUrl || ''}
                  onChange={e => setProjDlg(p => ({ ...p, data: { ...p.data, liveUrl: e.target.value } }))}
                  sx={inputSx} size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth label="GitHub URL" value={projDlg.data.githubUrl || ''}
                  onChange={e => setProjDlg(p => ({ ...p, data: { ...p.data, githubUrl: e.target.value } }))}
                  sx={inputSx} size="small"
                />
              </Grid>
              {/* Project image — upload or public folder path */}
              <Grid item xs={12}>
                <Box sx={{ border: '1px solid rgba(30,27,46,0.08)', borderRadius: 2, p: 2 }}>
                  <Typography sx={{ color: '#64748b', fontSize: 12, mb: 1.5, fontWeight: 600 }}>Project Image</Typography>
                  {projDlg.data.image && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                      <Box component="img" src={projDlg.data.image} alt="preview"
                        sx={{ height: 72, borderRadius: 1.5, border: '1px solid rgba(30,27,46,0.1)', display: 'block', objectFit: 'cover' }}
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                      <Box sx={{ flex: 1 }}>
                        {projDlg.data.image.startsWith('data:') ? (
                          <>
                            <Typography sx={{ color: '#f59e0b', fontSize: 11, mb: 0.5 }}>Uploaded — stored as base64</Typography>
                            <Button
                              size="small"
                              startIcon={<FileDownload sx={{ fontSize: 12 }} />}
                              onClick={() => {
                                const name = projDlg.data.name || 'project-image';
                                const path = downloadForPublic(projDlg.data.image, 'projects', name);
                                setProjDlg(p => ({ ...p, data: { ...p.data, image: path } }));
                                toast(`Downloaded! FTP to public/images/projects/ → path set: ${path}`, 'success');
                              }}
                              sx={{ color: '#2dd4bf', fontSize: 11, textTransform: 'none', p: '2px 8px', border: '1px solid rgba(45,212,191,0.35)', borderRadius: 1, mr: 1 }}
                            >
                              Save to public/images/
                            </Button>
                          </>
                        ) : (
                          <Typography sx={{ color: '#2dd4bf', fontSize: 11, wordBreak: 'break-all' }}>
                            {projDlg.data.image}
                          </Typography>
                        )}
                        <Button size="small" onClick={() => setProjDlg(p => ({ ...p, data: { ...p.data, image: null } }))}
                          sx={{ color: '#ef4444', fontSize: 11, p: 0, minWidth: 0, textTransform: 'none', mt: 0.25, display: 'block' }}>
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <label>
                      <input type="file" accept="image/*" hidden onChange={handleProjImage} />
                      <Button component="span" startIcon={<PhotoCamera />} sx={{ ...btnOutline, fontSize: 12 }}>
                        Upload Image
                      </Button>
                    </label>
                    <Typography sx={{ color: '#94a3b8', fontSize: 11 }}>Max 3 MB · stored as base64</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Box sx={{ flex: 1, height: '1px', background: 'rgba(30,27,46,0.07)' }} />
                    <Typography sx={{ color: '#94a3b8', fontSize: 11 }}>or use public folder path</Typography>
                    <Box sx={{ flex: 1, height: '1px', background: 'rgba(30,27,46,0.07)' }} />
                  </Box>
                  <TextField
                    fullWidth
                    label="Image path / URL"
                    placeholder="/images/projects/impacteers.jpg"
                    value={projDlg.data.image && !projDlg.data.image.startsWith('data:') ? projDlg.data.image : ''}
                    onChange={e => setProjDlg(p => ({ ...p, data: { ...p.data, image: e.target.value || null } }))}
                    sx={inputSx} size="small"
                    helperText={
                      <span style={{ color: '#94a3b8', fontSize: 11 }}>
                        FTP your image to <span style={{ color: '#6d5cd8' }}>public/images/projects/</span> then type the path here
                      </span>
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setProjDlg({ open: false, data: null })} sx={btnDanger}>Cancel</Button>
          <Button onClick={saveProj} sx={btnPrimary}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* ── Change password dialog ── */}
      <Dialog open={pwDlg.open} onClose={() => setPwDlg(p => ({ ...p, open: false, err: '' }))} PaperProps={{ sx: dialogPaperSx }} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ borderBottom: '1px solid rgba(30,27,46,0.07)', pb: 1.5 }}>Change Password</DialogTitle>
        <DialogContent sx={{ pt: '16px !important' }}>
          {pwDlg.err && (
            <Alert severity="error" sx={{ mb: 2, background: 'rgba(239,68,68,0.1)', color: '#dc2626', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', '& .MuiAlert-icon': { color: '#ef4444' } }}>
              {pwDlg.err}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { label: 'Current Password', key: 'current' },
              { label: 'New Password', key: 'next' },
              { label: 'Confirm New Password', key: 'confirm' },
            ].map(({ label, key }) => (
              <TextField
                key={key} fullWidth label={label}
                type={pwDlg.show ? 'text' : 'password'}
                value={pwDlg[key]}
                onChange={e => setPwDlg(p => ({ ...p, [key]: e.target.value, err: '' }))}
                sx={inputSx} size="small"
                InputProps={{
                  endAdornment: key === 'current' ? (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setPwDlg(p => ({ ...p, show: !p.show }))} sx={{ color: '#64748b' }} edge="end">
                        {pwDlg.show ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                }}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setPwDlg(p => ({ ...p, open: false, err: '' }))} sx={btnDanger}>Cancel</Button>
          <Button onClick={handleChangePassword} sx={btnPrimary}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* ── Snackbar ── */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack(p => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snack.severity}
          onClose={() => setSnack(p => ({ ...p, open: false }))}
          sx={{ borderRadius: '10px', fontWeight: 600 }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// ─── Empty state helper ───────────────────────────────────────────────────────

const EmptyState = ({ label }) => (
  <Box sx={{ textAlign: 'center', py: 5, color: '#94a3b8' }}>
    <Typography sx={{ fontSize: 40, mb: 1 }}>📭</Typography>
    <Typography sx={{ fontSize: 14 }}>{label}</Typography>
  </Box>
);

export default Profile;
