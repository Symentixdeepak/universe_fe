import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatMessage {
  id: string;
  parentMessageId: string;
  role: 'HUMAN' | 'AI';
  message: string;
}

interface AssistantChatContextType {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  conversationId: string | null;
  setConversationId: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  currentResponseIndex: { [parentId: string]: number };
  setCurrentResponseIndex: React.Dispatch<React.SetStateAction<{ [parentId: string]: number }>>;
  getResponsesByParentId: (parentId: string) => ChatMessage[];
  getCurrentResponse: (parentId: string) => ChatMessage | undefined;
  navigateResponse: (parentId: string, direction: 'prev' | 'next') => void;
}

const AssistantChatContext = createContext<AssistantChatContextType | undefined>(undefined);

export const useAssistantChat = () => {
  const context = useContext(AssistantChatContext);
  if (!context) {
    throw new Error('useAssistantChat must be used within AssistantChatProvider');
  }
  return context;
};

interface AssistantChatProviderProps {
  children: ReactNode;
  initialMessages?: ChatMessage[];
}

export const AssistantChatProvider: React.FC<AssistantChatProviderProps> = ({ 
  children,
  initialMessages = [{
    id: '1',
    parentMessageId: '1',
    role: 'AI',
    message: 'Great choice — Canada has a growing community of innovators shaping the future of technology. Based on your interests, I\'ve identified several potential connections who align with your goals:\n\n• Amelia R. - CTO at a Toronto-based AI startup, passionate about ethical AI and global collaboration.\n• David M. - Senior Product Manager in Vancouver, with experience in health tech and international collaboration.\n• Sofia L. - Researcher in Montreal specializing in human-centered design and emerging technologies.\n\nEach of them values meaningful professional relationships and is open to sharing insights within the tech community. I can introduce you to Amelia first, since her interests in AI and innovation closely match your profile. Would you like me to start there?'
  }]
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentResponseIndex, setCurrentResponseIndex] = useState<{ [parentId: string]: number }>({});

  // Get all responses with the same parent ID
  const getResponsesByParentId = (parentId: string): ChatMessage[] => {
    return messages.filter(m => m.parentMessageId === parentId && m.role === 'AI');
  };

  // Get the current response for a parent ID based on the index
  const getCurrentResponse = (parentId: string): ChatMessage | undefined => {
    const responses = getResponsesByParentId(parentId);
    const index = currentResponseIndex[parentId] || 0;
    return responses[index];
  };

  // Navigate between responses (carousel)
  const navigateResponse = (parentId: string, direction: 'prev' | 'next') => {
    const responses = getResponsesByParentId(parentId);
    if (responses.length <= 1) return;

    const currentIndex = currentResponseIndex[parentId] || 0;
    let newIndex = currentIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % responses.length;
    } else {
      newIndex = currentIndex === 0 ? responses.length - 1 : currentIndex - 1;
    }

    setCurrentResponseIndex(prev => ({
      ...prev,
      [parentId]: newIndex
    }));
  };

  return (
    <AssistantChatContext.Provider
      value={{
        messages,
        setMessages,
        conversationId,
        setConversationId,
        loading,
        setLoading,
        currentResponseIndex,
        setCurrentResponseIndex,
        getResponsesByParentId,
        getCurrentResponse,
        navigateResponse,
      }}
    >
      {children}
    </AssistantChatContext.Provider>
  );
};
