import Head from 'next/head';
import { Box, Typography, Container, Button } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeColors } from '@/hooks';
import { ProtectedRoute } from '@/components';
import UserConnector from '@/features/UserConnect';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const themeColors = useThemeColors();

  return (
    <ProtectedRoute requireProfileComplete={true}>
      <Head>
        <title>Dashboard - Universe Club</title>
      </Head>
    <UserConnector />
    </ProtectedRoute>
  );
}