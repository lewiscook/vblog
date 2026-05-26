import { createTheme } from '@mui/material/styles'

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: { main: '#6C63FF', light: '#8B85FF', dark: '#4B44CC', contrastText: '#fff' },
    secondary: { main: '#FF6584', contrastText: '#fff' },
    background: {
      default: mode === 'dark' ? '#0d0d1a' : '#f4f4f8',
      paper: mode === 'dark' ? '#1a1a2e' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#e8e8f0' : '#1a1a2e',
      secondary: mode === 'dark' ? '#9090b0' : '#6060808',
    },
    divider: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 30px rgba(108,99,255,0.2)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 600 },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6C63FF, #8B85FF)',
          '&:hover': { background: 'linear-gradient(135deg, #5a52e0, #7a75f0)' },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(20px)',
          backgroundColor: mode === 'dark' ? 'rgba(13,13,26,0.85)' : 'rgba(255,255,255,0.85)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: mode === 'dark' ? '#12122a' : '#ffffff',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { '& .MuiOutlinedInput-root': { borderRadius: 10 } },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: { backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' },
      },
    },
  },
})

export default getTheme
