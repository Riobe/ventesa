import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon, useTheme } from '@chakra-ui/core';

import { accent, bgColor } from '../../theme';

const NavLinkStyled = styled(Link)`
  display: grid;
  grid-template-columns: 55px auto;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-bottom: 30px;

  justify-items: center;
  align-items: center;

  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${accent('primary')};

    cursor: pointer;
  }
`;

const Nav = styled.section`
  grid-area: nav;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0.75rem 0;

  color: white;

  background-color: ${bgColor('nav')};

  svg:hover {
    color: ${accent('primary')};
  }
`;

const NavButtons = styled.div`
  display: flex;
  flex-direction: column;

  & .nav-link {
    justify-self: start;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
    padding-left: 12px;
    cursor: pointer;
  }
`;

const NavWrapper = styled.div`
  display: grid;
  grid-template-columns: 55px auto;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-bottom: 30px;

  justify-items: center;
  align-items: center;

  &:hover {
    color: ${accent('primary')};

    cursor: pointer;
  }
`;

const NavSettings = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  width: 55px;
`;

const ExpandArrow = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid ${bgColor('nav')};

  position: absolute;
  right: -15px;
  top: 50px;

  z-index: 10;
`;

const ExpandableNav = styled.div`
  height: 100%;
  overflow: hidden;
  max-width: 55px;
  width: 16rem;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 28px;
  padding-bottom: 15px;

  display: flex;
  flex-direction: column;

  z-index: 20;

  background-color: ${bgColor('nav')};

  transition: max-width 0.3s, right 0.3s;

  &:hover {
    max-width: calc(16rem + 55px);
  }
`;

const ICON_SIZE = '36px';

const buttons = [
  {
    icon: 'home',
    text: 'Home',
    link: '/',
  },
  {
    icon: 'book',
    text: 'Narrative Mode',
  },
  {
    icon: 'shield',
    text: 'Combat Mode',
    link: '/combat',
  },
  {
    icon: 'charms',
    text: 'Charms',
    link: '/Charms',
  },
  {
    icon: 'players',
    text: 'Characters',
    link: '/characters',
  },
];

function Sidebar() {
  const theme = useTheme();

  return (
    <Nav theme={theme} className="Sidebar">
      <ExpandArrow theme={theme} />
      <ExpandableNav theme={theme}>
        <NavButtons>
          {buttons.map(button => (
            <NavLinkStyled
              theme={theme}
              key={button.text}
              to={button.link || '/'}
            >
              <Icon name={button.icon} size={ICON_SIZE} />
              <div className="nav-link">{button.text}</div>
            </NavLinkStyled>
          ))}
        </NavButtons>

        <NavSettings>
          <Icon name="settings" color="white" size={ICON_SIZE} />
        </NavSettings>
      </ExpandableNav>
    </Nav>
  );
}

export default Sidebar;
