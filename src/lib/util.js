const Character = require('./Character');;
const { ATTACK_TYPE, DAMAGE_TYPE } = require('./constants');;
const { roll } = require('./roller');

const rio = new Character({ name: 'Riobe', soak: 5, parry: 2, evasion: 4, initiative: 10 });
rio.addAttack('Broadsword', { type: ATTACK_TYPE.ARTIFACT_LIGHT_MELEE });

const aeon = new Character({ name: 'Aeon', soak: 1, parry: 3, evasion: 1, initiative: 10 });
aeon.addAttack('Fists', { type: ATTACK_TYPE.UNARMED });

console.log(`Rio: ${rio.initiative} | Aeon: ${aeon.initiative}`);

const damagePool = rio.attacks['Broadsword'].witheringDamagePool(5, aeon);
console.log('Rio damage pool:', damagePool);

const result = roll(damagePool).successes;
console.log('Rio damaged for:', result);

rio.withering(result, aeon);
console.log(`Rio: ${rio.initiative} (+${result + 1}) | Aeon: ${aeon.initiative} (-${result})`);

console.log();

console.log('Riobe Health');
console.log(rio.consoleHealthLevels);

const aggrevatedDamage = 2;
const lethalDamage = 1;
const bashingDamage = 3;
console.log(`Dealing ${aggrevatedDamage + lethalDamage + bashingDamage} damage to Riobe`);

console.log('Riobe Health After Bashing Damage');
rio.damage(bashingDamage, DAMAGE_TYPE.BASHING);
console.log(rio.consoleHealthLevels);

console.log('Riobe Health After Lethal Damage');
rio.damage(lethalDamage, DAMAGE_TYPE.LETHAL);
console.log(rio.consoleHealthLevels);

console.log('Riobe Health After Aggrevated Damage');
rio.damage(aggrevatedDamage, DAMAGE_TYPE.AGGREVATED);
console.log(rio.consoleHealthLevels);

const healLevels = 2;
console.log(`Riobe Health After Healing ${healLevels} Damage`);
rio.heal(healLevels);
console.log(rio.consoleHealthLevels);
