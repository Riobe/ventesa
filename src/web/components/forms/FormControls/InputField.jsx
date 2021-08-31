import React from 'react';
import PropTypes from 'prop-types';

import { useField } from 'formik';

function InputField({ label, id, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div>
      <div className="label-wrapper">
        <label htmlFor={id}>{label}</label>
        <div className="asterisk">*</div>
      </div>
      <input
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

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default InputField;
