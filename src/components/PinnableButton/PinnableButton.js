import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@chakra-ui/core';
import styled from 'styled-components';
import { useTheme } from '@chakra-ui/core';

import { bgColor, accent, text } from '../../theme/helpers';

const PinnableButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: min-content;
  font-size: 0px;
  white-space: nowrap;
`;

const PinnableButtonLeft = styled.button.attrs({
  className: 'PinnableButtonPin',
})`
  height: 1.5rem;
  width: 0.75rem;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;

  padding: 0.25rem 0;
  margin: 0;

  background-color: ${bgColor('primary')};
  color: ${text('normal')};

  border: none;
  box-shadow: -0.06rem 0 0 0 ${accent('primary')};
  border-radius: 4rem 0 0 4rem;

  &:focus {
    outline: 0;
  }

  & > svg {
    margin-right: 0.1rem;
  }

  .pinned > & {
    box-shadow: -0.06rem 0 0 0.12rem ${accent('primary')};

    & > svg {
      color: ${accent('primary')};
    }
  }
`;

const PinnableButtonRight = styled.button.attrs({
  className: 'PinnableButtonRoute',
})`
  height: 1.5rem;
  width: 0.75rem;

  width: min-content;
  max-width: 6rem;
  min-width: 2rem;

  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  padding: 0.25rem 0.2rem;
  margin: 0;

  color: ${text('normal')};
  text-shadow: black 0.05rem 0.05rem 0.05rem;
  background-color: ${bgColor('button')};
  border-radius: 0 4rem 4rem 0;
  border: none;

  background-size: 200% 100%;
  background-image: linear-gradient(
    to left,
    ${bgColor('primary')} 50%,
    ${bgColor('button')} 50%
  );

  transition: background-position 0.2s;

  &:focus {
    outline: 0;
  }

  .PinnableButton:hover > & {
    background-position: -100% 0;
  }

  .pinned > & {
    box-shadow: 0.03rem -0.12rem 0 0 ${accent('primary')},
      0.03rem 0.12rem 0 0 ${accent('primary')},
      0.07rem 0 0 0.07rem ${accent('primary')};
  }
`;

const CloseButton = styled.button.attrs({
  className: 'PinnableButtonClose',
})`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 0.6rem;
  width: 1.2rem;

  position: absolute;
  right: 0.7rem;
  top: -0.6rem;

  font-size: 0.6rem;
  color: ${text('normal')};
  text-shadow: black 0.05rem 0.05rem 0.02rem;
  background-color: ${bgColor('button')};

  border: none;
  border-radius: 1.2rem 1.2rem 0 0;

  &:focus {
    outline: 0;
  }

  .pinned > & {
    background-color: ${accent('primary')};
    background-image: none;
  }

  background-size: 200% 100%;
  background-image: linear-gradient(
    to left,
    ${bgColor('primary')} 50%,
    ${bgColor('button')} 50%
  );

  transition: background-position 0.2s;

  .PinnableButton:hover > & {
    background-position: -100% 0;
  }
`;

/**
 * PinnableButton can be used to allow the ST or player to get to
 * recently used routes, and even pin those navigation links for quick access.
 *
 * ## States
 * * Normal, Inactive - This is the default state of a PinnableButton when created.
 *
 * * Normal, Inactive Hovered - When the button is hovered, but the route is
 *  not selected. This is where you would want to make the button removeable.
 *
 * * Normal, Active - This is where the button is not pinned, but the route it
 *  represents is being viewed.
 *
 * * Normal, Active Hovered - Same as the last state, but when the player is actively
 *  hovering over it.
 *
 * * Pinned, Inactive - This is a pinned route, but not one being actively viewed at
 *  the moment. This is always closeable.
 *
 * * Pinned, Inactive Hovered - When a pinned and inactive route is being hovered over.
 *
 * * Pinned, Active - When the pinned route is actively being viewed.
 *
 * * Pinned, Active Hovered - When the pinned route is actively being viewed *and* hovered over.
 */
function PinnableButton({
  pinned,
  className,
  children,
  onPinToggle,
  onRouteClicked,
  ...props
}) {
  const theme = useTheme();

  const finalClassName = (className || '') + (pinned ? ' pinned' : '');

  return (
    <PinnableButtonContainer
      className={'PinnableButton ' + finalClassName}
      {...props}
    >
      <PinnableButtonLeft theme={theme} onClick={() => onPinToggle(!pinned)}>
        <Icon name="pin" color="white" size="0.6rem" />
      </PinnableButtonLeft>

      <PinnableButtonRight theme={theme} onClick={() => onRouteClicked()}>
        {children}
      </PinnableButtonRight>

      <CloseButton theme={theme}>
        <Icon name="cancel" color="white" size="0.2rem" />
      </CloseButton>
    </PinnableButtonContainer>
  );
}

PinnableButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  pinned: PropTypes.bool,
  onPinToggle: PropTypes.func.isRequired,
  onRouteClicked: PropTypes.func.isRequired,
};

PinnableButton.defaultProps = {
  pinned: false,
};

export default PinnableButton;
