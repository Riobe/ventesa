import React from 'react';
import PropTypes from 'prop-types';

import { useField } from 'formik';

function CharacterTextareaField({ label, id, name, ...props }) {
  const [field, meta] = useField({ name });

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <textarea className="text-input" id={id} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
}

CharacterTextareaField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default CharacterTextareaField;
