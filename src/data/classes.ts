import type { CharacterClass, ClassCategory } from '../types';

/**
 * ⚠️ TRAINING ORDER — DO NOT REORDER OR SORT.
 *
 * This array is copied verbatim from the original inference script
 * (scripts/script.js, line 132). The position of each label IS the one-hot
 * index the model was trained with — note that positions 11–16 are NOT
 * alphabetical. Changing the order silently generates the wrong class.
 */
export const CLASS_LABEL_ORDER = [
  'Anakin Skywalker',
  'Calamari',
  'Darth Vader',
  'Ewok',
  'Han Solo',
  'Human',
  'Jawa',
  'Luke Skywalker',
  'Mace Windu',
  'Mandalorian',
  'Obi Wan Kenobi',
  'Imperial Officer',
  'Resistance Pilot',
  'SnowTrooper',
  'Imperial Soldier',
  'Resistance Soldier',
  'StormTrooper',
  'Togruta',
  'Twilek',
  'Wookiee',
  'Yoda',
  'Zabrak',
] as const;

export const NUM_CLASSES = CLASS_LABEL_ORDER.length;

export const CHARACTER_CLASSES: CharacterClass[] = [
  {
    id: 'anakin-skywalker',
    name: 'Anakin Skywalker',
    modelIndex: 0,
    category: 'jedi',
    image: 'images/classes/anakin-skywalker.jpg',
    description:
      'The chosen one of the saga — dark robes, determined stare and a faint glow of conflict. The model leans into warm skin tones and deep brown garments.',
  },
  {
    id: 'calamari',
    name: 'Calamari',
    modelIndex: 1,
    category: 'species',
    image: 'images/classes/calamari.jpg',
    description:
      'An amphibian-headed strategist species. Expect domed heads, large eyes and mottled salmon-orange textures in the generated figure.',
  },
  {
    id: 'darth-vader',
    name: 'Darth Vader',
    modelIndex: 2,
    category: 'sith',
    image: 'images/classes/darth-vader.jpg',
    description:
      'The iconic black silhouette: angular helmet, chest console and flowing cape. One of the strongest, most recognizable classes in the dataset.',
  },
  {
    id: 'ewok',
    name: 'Ewok',
    modelIndex: 3,
    category: 'species',
    image: 'images/classes/ewok.jpg',
    description:
      'Small forest dwellers wrapped in hoods. The model produces furry brown textures and compact, rounded proportions.',
  },
  {
    id: 'han-solo',
    name: 'Han Solo',
    modelIndex: 4,
    category: 'resistance',
    image: 'images/classes/han-solo.jpg',
    description:
      'The smuggler look: white shirt, dark vest and a confident smirk. Works best with frontal portraits.',
  },
  {
    id: 'human',
    name: 'Human',
    modelIndex: 5,
    category: 'species',
    image: 'images/classes/human.jpg',
    description:
      'The generalist class — a plain human figure. A great first test: it preserves the most features from your original photo.',
  },
  {
    id: 'jawa',
    name: 'Jawa',
    modelIndex: 6,
    category: 'species',
    image: 'images/classes/jawa.jpg',
    description:
      'Desert scavengers in rough brown robes with glowing eyes peering from a dark hood. High-contrast, moody outputs.',
  },
  {
    id: 'luke-skywalker',
    name: 'Luke Skywalker',
    modelIndex: 7,
    category: 'jedi',
    image: 'images/classes/luke-skywalker.jpg',
    description:
      'The farm-boy-turned-knight: sandy hair and light tunic. Produces bright, warm-toned figures.',
  },
  {
    id: 'mace-windu',
    name: 'Mace Windu',
    modelIndex: 8,
    category: 'jedi',
    image: 'images/classes/mace-windu.jpg',
    description:
      'A stern master in layered dark robes. The model emphasizes strong facial structure and deep browns.',
  },
  {
    id: 'mandalorian',
    name: 'Mandalorian',
    modelIndex: 9,
    category: 'warrior',
    image: 'images/classes/mandalorian.jpg',
    description:
      'Full-helmet armored bounty hunter. Expect metallic blues and the unmistakable T-shaped visor.',
  },
  {
    id: 'obi-wan-kenobi',
    name: 'Obi Wan Kenobi',
    modelIndex: 10,
    category: 'jedi',
    image: 'images/classes/obi-wan-kenobi.jpg',
    description:
      'The classic mentor: beige tunic, brown cloak and a well-kept beard. Balanced, soft-toned generations.',
  },
  {
    id: 'imperial-officer',
    name: 'Imperial Officer',
    modelIndex: 11,
    category: 'imperial',
    image: 'images/classes/imperial-officer.jpg',
    description:
      'Crisp grey uniform, rank bar and cap. Clean lines and cold tones dominate this class.',
  },
  {
    id: 'resistance-pilot',
    name: 'Resistance Pilot',
    modelIndex: 12,
    category: 'resistance',
    image: 'images/classes/resistance-pilot.jpg',
    description:
      'Bright orange flight suit with a white chest box and helmet. One of the most colorful classes.',
  },
  {
    id: 'snowtrooper',
    name: 'SnowTrooper',
    modelIndex: 13,
    category: 'imperial',
    image: 'images/classes/snowtrooper.jpg',
    description:
      'Cold-weather armored trooper with a skirted kama and insulated helmet. Predominantly white with soft shading.',
  },
  {
    id: 'imperial-soldier',
    name: 'Imperial Soldier',
    modelIndex: 14,
    category: 'imperial',
    image: 'images/classes/imperial-soldier.jpg',
    description:
      'Standard ground infantry of the empire: utilitarian armor and muted military tones.',
  },
  {
    id: 'resistance-soldier',
    name: 'Resistance Soldier',
    modelIndex: 15,
    category: 'resistance',
    image: 'images/classes/resistance-soldier.jpg',
    description:
      'Field gear, light armor plates and earthy colors — the rebel infantry look.',
  },
  {
    id: 'stormtrooper',
    name: 'StormTrooper',
    modelIndex: 16,
    category: 'imperial',
    image: 'images/classes/stormtrooper.jpg',
    description:
      'The white-armored classic. Strong geometric helmet features make this class especially crisp at low resolution.',
  },
  {
    id: 'togruta',
    name: 'Togruta',
    modelIndex: 17,
    category: 'species',
    image: 'images/classes/togruta.jpg',
    description:
      'Striped head-tails and bold facial patterns. Generates vivid oranges, whites and blues.',
  },
  {
    id: 'twilek',
    name: 'Twilek',
    modelIndex: 18,
    category: 'species',
    image: 'images/classes/twilek.jpg',
    description:
      'Elegant twin head-tails (lekku) and smooth skin tones ranging across the palette.',
  },
  {
    id: 'wookiee',
    name: 'Wookiee',
    modelIndex: 19,
    category: 'species',
    image: 'images/classes/wookiee.jpg',
    description:
      'Tall, shaggy and loyal. The model renders dense fur textures in warm browns with a bandolier accent.',
  },
  {
    id: 'yoda',
    name: 'Yoda',
    modelIndex: 20,
    category: 'jedi',
    image: 'images/classes/yoda.jpg',
    description:
      'Small, green and wise. Pointed ears and tattered robes — a fan-favorite class with very characterful outputs.',
  },
  {
    id: 'zabrak',
    name: 'Zabrak',
    modelIndex: 21,
    category: 'species',
    image: 'images/classes/zabrak.jpg',
    description:
      'Crowned with vestigial horns and facial tattoos. Produces striking red-and-black patterned figures.',
  },
];

export const CATEGORY_LABELS: Record<ClassCategory, string> = {
  jedi: 'Jedi',
  sith: 'Sith',
  imperial: 'Imperial',
  resistance: 'Resistance',
  warrior: 'Warrior',
  species: 'Species',
};

export function getClassById(id: string | null | undefined): CharacterClass | undefined {
  return CHARACTER_CLASSES.find((c) => c.id === id);
}

// Dev-time guard: every class must point at the exact training label for its
// one-hot index. Catches accidental reordering before it produces wrong output.
if (import.meta.env.DEV) {
  for (const c of CHARACTER_CLASSES) {
    if (CLASS_LABEL_ORDER[c.modelIndex] !== c.name) {
      throw new Error(
        `classes.ts is out of sync with the training order: "${c.name}" has modelIndex ${c.modelIndex} ` +
          `but CLASS_LABEL_ORDER[${c.modelIndex}] is "${CLASS_LABEL_ORDER[c.modelIndex]}".`,
      );
    }
  }
}
