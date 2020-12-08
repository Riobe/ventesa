import React from 'react';

import styled from 'styled-components';
import { IconButton, useTheme } from '@chakra-ui/core';
import { accent, bgColor } from '../../theme';

const ChatBoxContainer = styled.div`
  border-top: 1px solid grey;
  padding-top: 10px;
`;

const TextInput = styled.textarea`
  height: 5rem;
  width: 100%;

  border-radius: 10px;
  border: 1px solid #adadad;
  background-color: ${bgColor('primary')};
`;

const PlayerName = styled.div`
  flex: 1;
  line-height: 1.5rem;
  padding-left: 5px;

  background-color: red;
`;

const PlayerProfilePicture = styled.div`
  border-radius: 50%;
  background-color: blue;
  height: 1.4rem;
  width: 1.4rem;
`;

const PlayerLine = styled.div`
  display: flex;
`;

function TypedChat() {
  const theme = useTheme();

  return (
    <ChatBoxContainer>
      <TextInput theme={theme} />
      <PlayerLine>
        <PlayerProfilePicture />
        <PlayerName>Rio</PlayerName>
        <IconButton
          size="sm"
          variantColor="gray"
          aria-label="Send chat message"
          icon="arrow-forward"
        />
      </PlayerLine>
    </ChatBoxContainer>
  );
}

export default TypedChat;
