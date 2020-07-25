import React, { useState } from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  // PopoverFooter,
  PopoverArrow,
  PopoverCloseButton
} from '@chakra-ui/core';

import './AttackPanel.css';

function AttackPanel({ character }) {
  const [isAttacking, setIsAttacking] = useState(false);

  return (
    <Popover
      isOpen={isAttacking}
      onOpen={() => setIsAttacking(true)}
      onClose={() => setIsAttacking(false)}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button variantColor="red" size="sm">Attack</Button>
      </PopoverTrigger>
      <PopoverContent zIndex={4}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Attack</PopoverHeader>
        <PopoverBody>Please choose an attack:</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default AttackPanel;
