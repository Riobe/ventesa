import React from 'react';
import PropTypes from 'prop-types';

import { useField } from 'formik';

function CharacterTextBoxField({ label, id, name, ...props }) {
  const [field, meta] = useField({ name });

  return (
    <div>
      <div className="label-wrapper">
        <label htmlFor={id}>{label}</label>
        <div className="asterisk">*</div>
      </div>
      <textarea
        className={`text-input ${meta.error && meta.touched ? 'invalid' : ''}`}
        id={id}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
}

CharacterTextBoxField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default CharacterTextBoxField;
