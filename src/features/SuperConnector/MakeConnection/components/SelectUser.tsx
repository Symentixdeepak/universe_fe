import { Button, SvgIcon } from "@/components";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useConnectionSearch } from "../context";
import ConnectionSearchList from "./ConnectionSearchList";
import { SelectionPosition } from "../types";
import ConnectingDots from "@/components/ConnectingDots";
import ProfileIcon from "../ProfileIcon";

const SelectUser = () => {
  const theme = useTheme();
  const [showThirdIcon, setShowThirdIcon] = useState(false);
  const {
    showSearchResults,
    connections,
    handleConnectionSelect,
    closeSearchResults,
    setShowSearchResults,
    setCurrentSelectionPosition,
    currentSelectionPosition,
    selectedConnections,
    getSelectionFlag,
    showConfirmation,
    setShowConfirmation,
  } = useConnectionSearch();

  const selectionFlags = getSelectionFlag();

  const handleSvgClick = (position: SelectionPosition) => {
    setCurrentSelectionPosition(position);
    setShowSearchResults(true);
  };

  const renderSelectionIcon = (position: SelectionPosition) => {
    const selectedConnection =
      selectedConnections[position as keyof typeof selectedConnections];

    if (selectedConnection) {
      return (
        <Box sx={{ textAlign: "center" }}>
          <Avatar
            src={selectedConnection.avatarUrl}
            alt={selectedConnection.name}
            sx={{
              width: 130,
              height: 130,
              cursor: "pointer",
              mb: 1,
            }}
            onClick={() => handleSvgClick(position)}
          />
          <Typography
            sx={{
              textAlign: "center",
              color: theme.palette.secondary.light,
            }}
            variant="bodyLight"
          >
            {selectedConnection.name}
          </Typography>
        </Box>
      );
    }

    return (
      <ProfileIcon
        width={140}
        height={140}
        onClick={() => handleSvgClick(position)}
        isSelected={showSearchResults && currentSelectionPosition === position}
      />
    );
  };

  const handleAddIconClick = () => {
    setShowThirdIcon(true);
    setCurrentSelectionPosition("third");
    setShowSearchResults(true);
  };

  const renderAddIcon = () => (
    <div>
      <IconButton onClick={handleAddIconClick} sx={{ mt: 6 }}>
        <SvgIcon  name="add_circle" height={20} width={20} />
      </IconButton>
    </div>
  );

  const showAddIcon =
    selectionFlags.firstSelected &&
    selectionFlags.secondSelected &&
    !selectionFlags.thirdSelected &&
    !showThirdIcon;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap:
            selectionFlags.firstSelected && selectionFlags.secondSelected
              ? 2
              : 9,
          ml:showConfirmation ? 0 :
            selectionFlags.firstSelected &&
            selectionFlags.secondSelected &&
            !(selectionFlags.thirdSelected || showThirdIcon)
              ? 4
              : 0,
          mb: 5,
        }}
      >
        {renderSelectionIcon("first")}

        {selectionFlags.firstSelected && selectionFlags.secondSelected && (
          <ConnectingDots normalized={true} />
        )}

        <Box sx={{ display: "flex", gap: 2 }}>
          {renderSelectionIcon("second")}

          {showAddIcon &&
            !showThirdIcon &&
            !showConfirmation &&
            renderAddIcon()}
        </Box>

        {selectionFlags.firstSelected &&
          selectionFlags.secondSelected &&
          showThirdIcon && <ConnectingDots normalized={true} />}

        {(showThirdIcon || selectionFlags.thirdSelected) && (
          <Box
            sx={{
              transform: showThirdIcon ? "translateX(0)" : "translateX(-100px)",
              opacity: showThirdIcon ? 1 : 0,
              transition: "all 0.3s ease-out",
              animation: showThirdIcon
                ? "slideInFromLeft 0.3s ease-out"
                : "none",
              "@keyframes slideInFromLeft": {
                "0%": {
                  transform: "translateX(-100px)",
                  opacity: 0,
                },
                "100%": {
                  transform: "translateX(0)",
                  opacity: 1,
                },
              },
            }}
          >
            {renderSelectionIcon("third")}
          </Box>
        )}
      </Box>
      {selectionFlags.secondSelected && !showConfirmation && (
        <Box>
          <Button
            sx={{ mb: 5 }}
            variant="outlined"
            disabled={
              selectionFlags?.firstSelected &&
              selectionFlags?.secondSelected &&
              !selectionFlags?.thirdSelected &&
              !showThirdIcon
                ? false
                : showAddIcon || !selectionFlags.thirdSelected
                ? true
                : false
            }
            onClick={() => setShowConfirmation(true)}
          >
            Confirm Connection
          </Button>
        </Box>
      )}
      {showSearchResults && !showConfirmation && (
        <>
          <Box sx={{ height:"calc(100% - 1200px)", }} onClick={closeSearchResults} />
          <ConnectionSearchList
            connections={connections}
            onConnectionSelect={handleConnectionSelect}
            onClose={closeSearchResults}
          />
        </>
      )}
    </>
  );
};

export default SelectUser;
