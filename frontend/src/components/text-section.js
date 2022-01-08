import React from "react";
import MuiBox from "./MaterialUI/mui-box";
import MuiDivider from "./MaterialUI/mui-divider";
import MuiTypography from "./MaterialUI/mui-typography";

const TextSection = ({ textLines, sectionHeader }) => {
  return (
    <MuiBox className="container item-desc no-bottom-padding">
      <MuiDivider headerText={sectionHeader} />
      <MuiBox className="no-bottom-padding">
        {textLines.map((line) => (
          <MuiTypography key={line.label} variant="p" baseComponent="p">
            {`${line.label} -> ${line.text}`}
          </MuiTypography>
        ))}
      </MuiBox>
    </MuiBox>
  );
};

export default TextSection;
