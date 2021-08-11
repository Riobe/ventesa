import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, useField } from 'formik';

import { CharacterInputFields } from './segments';

function CharacterCreationForm() {
  return (
    <>
      <h1>Create your Essence Character</h1>
      <Formik
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <CharacterInputFields
            label="Character Name"
            name="Name"
            type="text"
            placeholder="Name"
          />

          <CharacterInputFields
            label="Exalt Type"
            name="Exalt Type"
            type="select"
            placeholder="Name"
          />

          <CharacterInputFields
            label="Force"
            name="Force"
            type="number"
            placeholder="0"
          />

          <CharacterInputFields
            label="Finesse"
            name="Finesse"
            type="number"
            placeholder="0"
          />

          <CharacterInputFields
            label="Fortitude"
            name="Fortitude"
            type="number"
            placeholder="0"
          />
        </Form>
      </Formik>
    </>
  );
}

export default CharacterCreationForm;
