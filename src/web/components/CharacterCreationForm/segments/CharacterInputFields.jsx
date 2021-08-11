import React from 'react';
import PropTypes from 'prop-types';

import { useField } from 'formik';

function CharacterInputFields({ label, id, name, ...props }) {
  const [field] = useField(props);
  if (!id && !name) {
    throw new Error('Needs ID or Name');
  }
  console.log(field);

  return (
    <>
      <label htmlFor={id || name}>{label}</label>
      <input className="text-input" />
    </>
  );
}

CharacterInputFields.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number,
  name: PropTypes.string,
};

export default CharacterInputFields;
