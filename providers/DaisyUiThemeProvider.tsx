"use client";
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/redux/store'

interface Props {
  children: React.ReactNode;
}

const DaisyUiThemeProvider = ({ children }: Props) => {
  const theme = useSelector((state: RootState) => state.theme.mode);

  return (
    <div data-theme={theme}>
      {children}
    </div>
  );
};

export default DaisyUiThemeProvider;
