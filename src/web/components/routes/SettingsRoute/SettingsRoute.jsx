import React, { useContext } from 'react';
import { FormControl, FormLabel, Switch } from '@chakra-ui/core';

import settingsContext from '../../../context/settingsContext';

function SettingsRoute() {
  const settings = useContext(settingsContext);
  const debug = !!settings.data.debug;

  return (
    <div>
      <h1>Settings</h1>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="debug-mode" mb="0">
          Enable debug mode?
        </FormLabel>
        <Switch
          id="debug-mode"
          isChecked={debug}
          onChange={() => {
            settings.update({
              ...settings.data,
              debug: !debug,
            });
          }}
        />
      </FormControl>
    </div>
  );
}

export default SettingsRoute;
