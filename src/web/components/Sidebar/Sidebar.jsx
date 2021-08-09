import React from 'react';
import { Icon, useTheme } from '@chakra-ui/core';

import {
  ExpandableNav,
  ExpandArrow,
  Nav,
  NavButtons,
  NavLinkStyled,
  NavSettings,
} from './segments';

const ICON_SIZE = '36px';

const buttons = [
  {
    icon: 'players',
    text: 'Characters',
    link: '/characters',
  },
  {
    icon: 'charms',
    text: 'Charms',
    link: '/charms',
  },
  {
    icon: 'book',
    text: 'Qualities',
    link: '/qualities',
  },
  {
    icon: 'shield',
    text: 'Equipment',
    link: '/equipment',
  },
  {
    icon: 'fist',
    text: 'Combat Mode',
    link: '/combat',
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
              activeClassName="active"
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
