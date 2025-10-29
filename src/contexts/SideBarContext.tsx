import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextProps {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false); // 👈 Default to closed

  const toggleSidebar = () => setIsSidebarExpanded((prev) => !prev);
  const openSidebar = () => setIsSidebarExpanded(true);
  const closeSidebar = () => setIsSidebarExpanded(false);

  return (
    <SidebarContext.Provider value={{ 
      isSidebarExpanded, 
      toggleSidebar, 
      openSidebar, 
      closeSidebar 
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextProps => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
