import styled from 'styled-components';

import { bgColor, accent, text } from '../../../theme/helpers';

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
    ${bgColor('title')} 50%
  );

  transition: background-position 0.08s;

  .PinnableButton:hover > & {
    background-position: -100% 0;
    transition: background-position 0.12s 0.08s;
  }
`;

export default CloseButton;
