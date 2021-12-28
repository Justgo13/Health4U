import React, { useState } from "react";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

const MuiToggleButton = ({onChange}) => {
  const [currentView, setCurrentView] = useState("module");

  const handleChange = (event, nextView) => {
    setCurrentView(nextView);
    console.log(nextView);
    nextView === "module"
      ? onChange(true)
      : onChange(false);
  };

  return (
    <ToggleButtonGroup
      value={currentView}
      exclusive
      onChange={handleChange}
      className="toggle-group"
    >
      <ToggleButton value="module" aria-label="module">
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton value="list" aria-label="list">
        <ViewListIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default MuiToggleButton;
