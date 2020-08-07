const WeaponType = {
  MELEE: {
    LIGHT: 'MELEE_LIGHT',
    MEDIUM: 'MELEE_MEDIUM',
    HEAVY: 'MELEE_HEAVY'
  },
  THROWN: {
    LIGHT: 'THROWN_LIGHT',
    MEDIUM: 'THROWN_MEDIUM',
    HEAVY: 'THROWN_HEAVY'
  },
  ARCHERY: {
    LIGHT: 'ARCHERY_LIGHT',
    MEDIUM: 'ARCHERY_MEDIUM',
    HEAVY: 'ARCHERY_HEAVY'
  }
};

WeaponType.UNARMED = WeaponType.MELEE.LIGHT;

export default WeaponType;
