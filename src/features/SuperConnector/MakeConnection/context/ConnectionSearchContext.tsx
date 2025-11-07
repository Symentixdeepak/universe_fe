import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Connection {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
}

const mockConnections: Connection[] = [
  {
    id: '1',
    name: 'Leonardo',
    description: 'Team leader and strategist, focused on discipline and guiding the group.',
    avatarUrl: '/assets/images/sample/sample-media-1.png',
  },
  {
    id: '2',
    name: 'Michelangelo',
    description: 'Creative spirit and morale booster, bringing energy, humor, .',
    avatarUrl: '/assets/images/sample/sample-media-2.png',
  },
  {
    id: '3',
    name: 'Donatello',
    description: 'Tech innovator and problem solver, specializing in gadgets, engineering, .',
    avatarUrl: '/assets/images/sample/sample-media-3.png',
  },
  {
    id: '4',
    name: 'Raphael',
    description: 'Protector and enforcer, driven by passion and strength to defend the.',
    avatarUrl: '/assets/images/sample/sample-media-1.png',
  },
];

interface SelectedConnections {
  first?: Connection;
  second?: Connection;
  third?: Connection;
}

type SelectionPosition = 'first' | 'second' | 'third';

interface ConnectionSearchContextType {
  searchText: string;
  setSearchText: (text: string) => void;
  showSearchResults: boolean;
  setShowSearchResults: (show: boolean) => void;
  currentSelectionPosition: SelectionPosition | null;
  setCurrentSelectionPosition: (position: SelectionPosition) => void;
  selectedConnections: SelectedConnections;
  connections: Connection[];
  handleSearch: () => void;
  handleConnectionSelect: (connection: Connection) => void;
  clearSearch: () => void;
  closeSearchResults: () => void;
  getSelectionFlag: () => { firstSelected: boolean; secondSelected: boolean; thirdSelected: boolean };
  isConnectionSelected: (connectionId: string) => boolean;
  showConfirmation: boolean;
  setShowConfirmation: (show: boolean) => void;
}

const ConnectionSearchContext = createContext<ConnectionSearchContextType | undefined>(undefined);

export const ConnectionSearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchText, setSearchText] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currentSelectionPosition, setCurrentSelectionPosition] = useState<SelectionPosition | null>(null);
  const [selectedConnections, setSelectedConnections] = useState<SelectedConnections>({});
  const [connections] = useState<Connection[]>(mockConnections);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchText.toLowerCase()) ||
    connection.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = useCallback(() => {
    setShowSearchResults(true);
  }, []);

  const handleConnectionSelect = useCallback((connection: Connection) => {
    if (currentSelectionPosition) {
      setSelectedConnections(prev => ({
        ...prev,
        [currentSelectionPosition]: connection
      }));
    //   setShowSearchResults(false);
    //   setCurrentSelectionPosition(null);
    }
  }, [currentSelectionPosition]);

  const clearSearch = useCallback(() => {
    setSearchText('');
    setShowSearchResults(false);
    setCurrentSelectionPosition(null);
  }, []);

  const closeSearchResults = useCallback(() => {
    setShowSearchResults(false);
    setCurrentSelectionPosition(null);
  }, []);

  const getSelectionFlag = useCallback(() => ({
    firstSelected: !!selectedConnections.first,
    secondSelected: !!selectedConnections.second,
    thirdSelected: !!selectedConnections.third,
  }), [selectedConnections]);

  const isConnectionSelected = useCallback((connectionId: string) => {
    return Object.values(selectedConnections).some(conn => conn?.id === connectionId);
  }, [selectedConnections]);

  const value: ConnectionSearchContextType = {
    searchText,
    setSearchText,
    showSearchResults,
    setShowSearchResults,
    currentSelectionPosition,
    setCurrentSelectionPosition,
    selectedConnections,
    connections: filteredConnections,
    handleSearch,
    handleConnectionSelect,
    clearSearch,
    closeSearchResults,
    getSelectionFlag,
    isConnectionSelected,
    showConfirmation,
    setShowConfirmation,
  };

  return (
    <ConnectionSearchContext.Provider value={value}>
      {children}
    </ConnectionSearchContext.Provider>
  );
};

export const useConnectionSearch = (): ConnectionSearchContextType => {
  const context = useContext(ConnectionSearchContext);
  if (context === undefined) {
    throw new Error('useConnectionSearch must be used within a ConnectionSearchProvider');
  }
  return context;
};