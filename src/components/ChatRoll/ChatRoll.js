import React from 'react';

import styled from 'styled-components';
import { IconButton, useTheme } from '@chakra-ui/core';
import NotchedBox from '../NotchedBox';

const ChatRollContainer = styled.div`
  font-family: Arial;
  font-weight: bold;
  color: white;

  margin-bottom: 45px;
`;

const PlayerInfoContainer = styled.div`
  display: flex;
  position: absolute;
  margin-top: -22px;
`;
const PlayerProfilePicture = styled.div`
  border-radius: 50%;
  background-color: blue;
  height: 2rem;
  width: 2rem;
`;

const PlayerName = styled.div`
  flex: 1;
  align-self: flex-start;
  line-height: 1.5rem;
  font-size: 0.9rem;
  padding-left: 5px;
`;

function ChatRoll() {
  return (
    <ChatRollContainer>
      <PlayerInfoContainer>
        <PlayerProfilePicture />
        <PlayerName>Banshee</PlayerName>
      </PlayerInfoContainer>
      <NotchedBox>test</NotchedBox>
    </ChatRollContainer>
  );
}

export default ChatRoll;
