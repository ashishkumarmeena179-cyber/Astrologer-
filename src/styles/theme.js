export const theme = {
  colors: {
    background: {
      primary: '#0f1025', // Deep Dark Cosmic
      secondary: '#1a1b4b', // Card Background
      overlay: 'rgba(15, 16, 37, 0.85)', // Modal Backdrop
    },
    text: {
      primary: '#ffffff',
      secondary: '#a1a1aa', // Soft Gray
      accent: '#d8b4fe', // Pale Purple Glow
    },
    primary: {
      main: '#8b5cf6', // Mystic Purple
      dark: '#4c1d95',
      light: '#a78bfa',
      glow: 'rgba(139, 92, 246, 0.5)',
    },
    accent: {
      cyan: '#06b6d4', // Energy/Spirit
      teal: '#14b8a6', // Healing
      pink: '#ec4899', // Love/Heart
      gold: '#f59e0b', // Fortune/Sun
      danger: '#ef4444', // Error/Warning
    },
    lines: {
      heart: '#ec4899', // Pink
      head: '#06b6d4',  // Cyan
      life: '#22c55e',  // Green
      fate: '#f59e0b',  // Gold
    }
  },
  typography: {
    fontFamily: {
      heading: '"Cinzel", serif',
      body: '"Inter", sans-serif',
    },
    weights: {
      regular: 400,
      medium: 500,
      bold: 700,
    }
  },
  gradients: {
    cosmic: 'linear-gradient(to bottom, #0f1025, #1a1b4b)',
    mystic: 'linear-gradient(135deg, #4c1d95 0%, #8b5cf6 100%)',
    glass: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  },
  shadows: {
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    neon: '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
  },
  borderRadius: {
    card: '24px',
    button: '9999px', // Fully rounded
    input: '16px',
  },
  animation: {
    transition: 'all 0.3s ease-in-out',
  }
};

export default theme;
