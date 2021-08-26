import React from 'react';
import { Formik, Form } from 'formik';
import { fullCharacterSchema } from '../../../shared/enums/CharacterValidation';

import { CharacterInputField } from './segments';
import { CharacterDropdownField } from './segments';
import { CharacterInitalValues } from './segments';
import { CharacterTextareaField } from './segments';

import { FormStyle } from './segments';

import { abilitiesArray } from '../../../shared/enums/abilities';
import { attributesArray } from '../../../shared/enums/attributes';
import { exaltedTypeArray } from '../../../shared/enums/exalted-type';

function CharacterCreationForm() {
  return (
    <>
      <h1>Create your Essence Character</h1>

      <Formik
        initialValues={CharacterInitalValues}
        validationSchema={fullCharacterSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form>
            <FormStyle>
              <CharacterInputField
                id="name"
                label="Exalt Name"
                name="name"
                type="text"
                placeholder="Required"
              />

              <CharacterTextareaField
                id="description"
                label="description"
                name="description"
                type="textarea"
                placeholder="Required"
              />

              <CharacterDropdownField
                id="exaltType"
                label="Exalt Type"
                name="exaltType"
                type="text"
              >
                <option value="">Select an Exalt type</option>

                {exaltedTypeArray.map(exalt => {
                  return (
                    <option id={exalt} name={exalt} value={exalt} key={exalt}>
                      {exalt}
                    </option>
                  );
                })}
              </CharacterDropdownField>

              <CharacterInputField
                id="essence"
                label="essence"
                name="essence"
                type="number"
              />

              <CharacterInputField
                id="motes"
                label="motes"
                name="motes"
                type="number"
              />

              <CharacterInputField
                id="soak"
                label="soak"
                name="soak"
                type="number"
              />
              <CharacterInputField
                id="hardness"
                label="hardness"
                name="hardness"
                type="number"
              />
              <CharacterInputField
                id="parry"
                label="parry"
                name="parry"
                type="number"
              />
              <CharacterInputField
                id="evasion"
                label="evasion"
                name="evasion"
                type="number"
              />
              <CharacterInputField
                id="resolve"
                label="resolve"
                name="resolve"
                type="number"
              />

              {attributesArray.map(attribute => {
                return (
                  <CharacterInputField
                    id={attribute}
                    label={attribute}
                    name={attribute}
                    type="number"
                    placeholder="0"
                    key={attribute}
                  />
                );
              })}

              {abilitiesArray.map(ability => {
                return (
                  <CharacterInputField
                    id={ability}
                    label={ability}
                    name={ability}
                    type="number"
                    placeholder={0}
                    key={ability}
                  />
                );
              })}
            </FormStyle>
            <button
              data-test="example"
              type="sumbit"
              disabled={!isValid || !dirty || isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CharacterCreationForm;
