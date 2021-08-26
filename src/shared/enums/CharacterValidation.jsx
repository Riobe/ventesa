import * as yup from 'yup';

import { exaltedTypeArray } from './exalted-type';

const { number, object, string } = yup;

const NAME_LENGTH = 64;
const DESCRIPTION_LENGTH = 2000;

const fullCharacterSchema = object()
  .strict()
  .shape({
    name: string().required('Required').min(1).max(NAME_LENGTH),
    description: string().required('Required').min(1).max(DESCRIPTION_LENGTH),

    essence: number().required().integer().min(0),
    exaltType: string().required().oneOf(exaltedTypeArray),
    motes: number().required().integer().min(0),

    soak: number().required().integer().min(0),
    hardness: number().required().integer().min(0),
    parry: number().required().integer().min(0),
    evasion: number().required().integer().min(0),
    resolve: number().required().integer().min(0),

    force: number().required().integer().min(0),
    finesse: number().required().integer().min(0),
    fortitude: number().required().integer().min(0),

    awareness: number().required().integer().min(0),
    athletics: number().required().integer().min(0),
    closeCombat: number().required().integer().min(0),
    craft: number().required().integer().min(0),
    embassy: number().required().integer().min(0),
    integrity: number().required().integer().min(0),
    navigate: number().required().integer().min(0),
    performance: number().required().integer().min(0),
    physique: number().required().integer().min(0),
    presence: number().required().integer().min(0),
    rangedCombat: number().required().integer().min(0),
    sagacity: number().required().integer().min(0),
    stealth: number().required().integer().min(0),
    war: number().required().integer().min(0),
  });

export { fullCharacterSchema };
