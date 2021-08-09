import styled from 'styled-components';

import { bgColor, accent, text } from '../../../theme/helpers';

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

export default PinnableButtonLeft;
