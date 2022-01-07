import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import MuiBox from './MaterialUI/mui-box';

export default function LoadingCircle() {
  return (
    <MuiBox className="center">
      <CircularProgress color="primary" />
    </MuiBox>
  );
}