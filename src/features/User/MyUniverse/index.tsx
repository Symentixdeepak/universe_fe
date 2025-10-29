import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useThemeColors } from '@/hooks';
import { useRouter } from 'next/router';
import {
  SearchSidebar,
  ProfileHeader,
  ProfileDetails,
  ProfileAboutFooter,
} from './components';

interface MyUniverseProps {
  selectedUserId?: string;
}

const MyUniverse: React.FC<MyUniverseProps> = ({ selectedUserId }) => {
  const themeColors = useThemeColors();
  const router = useRouter();
  const [selectedConnectionId, setSelectedConnectionId] = useState<string>(selectedUserId || '1');

  // Update selectedConnectionId when selectedUserId prop changes
  useEffect(() => {
    if (selectedUserId) {
      setSelectedConnectionId(selectedUserId);
    }
  }, [selectedUserId]);

  const handleConnectionSelect = (connectionId: string) => {
    setSelectedConnectionId(connectionId);
    // Navigate to the new user's profile
    router.push(`/user/my-universe/${connectionId}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: themeColors.background.primary,
      }}
    >
      {/* Left Sidebar */}
      <SearchSidebar 
        selectedConnectionId={selectedConnectionId}
        onConnectionSelect={handleConnectionSelect}
      />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
            padding:"40px"
        }}
      >
        {/* Profile Header */}
        <ProfileHeader />

        {/* Profile Details */}
        <ProfileDetails />

        {/* Profile About Footer */}
        <ProfileAboutFooter />
      </Box>
    </Box>
  );
};

export default MyUniverse;