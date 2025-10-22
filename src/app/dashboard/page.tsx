'use client';

import { Box, Typography, Container, Button } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeColors } from '@/hooks';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const themeColors = useThemeColors();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Typography
          variant="h2Bold"
          sx={{
            color: themeColors.text.primary,
            mb: 2,
          }}
        >
          Welcome to the Dashboard
        </Typography>

        <Typography
          variant="bodyRegular"
          sx={{
            color: themeColors.text.secondary,
            mb: 4,
            maxWidth: 600,
          }}
        >
          Hello {user?.full_name || user?.email}! You have successfully logged in.
          This is a protected page that only authenticated users can access.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            onClick={() => window.location.href = '/interests'}
            sx={{ minWidth: 120 }}
          >
            Go to Interests
          </Button>
          
          <Button
            variant="contained"
            onClick={logout}
            sx={{ minWidth: 120 }}
          >
            Logout
          </Button>
        </Box>

        <Box sx={{ mt: 4, p: 3, border: `1px solid ${themeColors.border.secondary}`, borderRadius: 2 }}>
          <Typography variant="bodyBold" sx={{ color: themeColors.text.primary, mb: 1 }}>
            User Information:
          </Typography>
          <Typography variant="bodyLight" sx={{ color: themeColors.text.secondary }}>
            Email: {user?.email}
          </Typography>
          {user?.full_name && (
            <Typography variant="bodyLight" sx={{ color: themeColors.text.secondary }}>
              Name: {user.full_name}
            </Typography>
          )}
          {user?.location && (
            <Typography variant="bodyLight" sx={{ color: themeColors.text.secondary }}>
              Location: {user.location}
            </Typography>
          )}
          {user?.occupation && (
            <Typography variant="bodyLight" sx={{ color: themeColors.text.secondary }}>
              Occupation: {user.occupation}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}