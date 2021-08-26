import styled from 'styled-components';

const FormStyle = styled.div`
/* removing default browser styles */

  textarea, input, select {outline: none};

/* Form styles */

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 2rem;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .label-wrapper {
    display: flex;
    flex-direction: row;
  }

  input,
  textarea,
  select {
    padding: 0.4rem;

    border-radius 0.7rem;
  }

  input[type=number] {
    width: 4rem;
  }

  input.invalid,select.invalid,textarea.invalid {
    border: 4px solid red;
  }

  .error {
    font-size: 1rem;
    color: red;
  }

`;

export default FormStyle;
