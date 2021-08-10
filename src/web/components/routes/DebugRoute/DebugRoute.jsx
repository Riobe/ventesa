import React, { useContext } from 'react';

import { DebugOutput } from './segments';

import settingsContext from '../../../context/settingsContext';

function DebugRoute() {
  const settings = useContext(settingsContext);

  return (
    <div>
      <h1>Debug</h1>
      <h2>Settings Data</h2>
      <DebugOutput>{JSON.stringify(settings.data, null, 2)}</DebugOutput>
    </div>
  );
}

export default DebugRoute;
