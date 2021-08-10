import React from 'react';

export const defaultValue = {
  data: {},
  update: () => {},
};

const settingsContext = React.createContext(defaultValue);

export const {
  Provider: SettingsProvider,
  Consumer: SettingsConsumer,
} = settingsContext;

export default settingsContext;
