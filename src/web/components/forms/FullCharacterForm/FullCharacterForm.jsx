import React from 'react';
import { Formik, Form } from 'formik';
import { fullCharacterSchema } from '../../../../shared/enums/CharacterValidation.jsx';

import { FullCharacterInitalValues } from './segments';

import { InputField } from '../FormControls';
import { DropdownField } from '../FormControls';
import { TextAreaField } from '../FormControls';

import { FullCharacterFormStyle } from './segments';

import { abilitiesArray } from '../../../../shared/enums/abilities';
import { attributesArray } from '../../../../shared/enums/attributes';
import { exaltedTypeArray } from '../../../../shared/enums/exalted-type';

function CharacterCreationForm() {
  return (
    <>
      <h1>Create your Essence Character</h1>

      <Formik
        initialValues={FullCharacterInitalValues}
        validationSchema={fullCharacterSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form>
            <FullCharacterFormStyle>
              <InputField
                id="name"
                label="Exalt Name"
                name="name"
                type="text"
                placeholder="Required"
              />

              <TextAreaField
                id="description"
                label="description"
                name="description"
                type="textarea"
                placeholder="Required"
              />

              <DropdownField
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
              </DropdownField>

              <InputField
                id="essence"
                label="essence"
                name="essence"
                type="number"
              />

              <InputField id="motes" label="motes" name="motes" type="number" />

              <InputField id="soak" label="soak" name="soak" type="number" />
              <InputField
                id="hardness"
                label="hardness"
                name="hardness"
                type="number"
              />
              <InputField id="parry" label="parry" name="parry" type="number" />
              <InputField
                id="evasion"
                label="evasion"
                name="evasion"
                type="number"
              />
              <InputField
                id="resolve"
                label="resolve"
                name="resolve"
                type="number"
              />

              {attributesArray.map(attribute => {
                return (
                  <InputField
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
                  <InputField
                    id={ability}
                    label={ability}
                    name={ability}
                    type="number"
                    placeholder={0}
                    key={ability}
                  />
                );
              })}
            </FullCharacterFormStyle>
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
