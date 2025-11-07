import { useState, useCallback } from 'react';

export interface Connection {
  id: string;
  name: string;
  description: string;
  avatar: string;
}

const mockConnections: Connection[] = [
  {
    id: '1',
    name: 'Leonardo',
    description: 'Team leader and strategist, focused on discipline and guiding the group with responsibility.',
    avatar: '/assets/images/sample/sample-media-1.png',
  },
  {
    id: '2',
    name: 'Michelangelo',
    description: 'Creative spirit and morale booster, bringing energy, humor, and out-of-the-box ideas.',
    avatar: '/assets/images/sample/sample-media-2.png',
  },
  {
    id: '3',
    name: 'Donatello',
    description: 'Tech innovator and problem solver, specializing in gadgets, engineering, and scientific solutions.',
    avatar: '/assets/images/sample/sample-media-3.png',
  },
  {
    id: '4',
    name: 'Raphael',
    description: 'Protector and enforcer, driven by passion and strength to defend the team and challenge limits.',
    avatar: '/assets/images/sample/sample-media-1.png',
  },
];

export const useConnectionSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [connections] = useState<Connection[]>(mockConnections);

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchText.toLowerCase()) ||
    connection.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = useCallback(() => {
    // Always show search results when icon is clicked, regardless of search text
    setShowSearchResults(true);
  }, []);

  const handleConnectionSelect = useCallback((connection: Connection) => {
    setSelectedConnection(connection);
    setShowSearchResults(false);
    setSearchText(connection.name);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchText('');
    setShowSearchResults(false);
    setSelectedConnection(null);
  }, []);

  const closeSearchResults = useCallback(() => {
    setShowSearchResults(false);
  }, []);

  return {
    searchText,
    setSearchText,
    showSearchResults,
    setShowSearchResults,
    selectedConnection,
    connections: filteredConnections,
    handleSearch,
    handleConnectionSelect,
    clearSearch,
    closeSearchResults,
  };
};