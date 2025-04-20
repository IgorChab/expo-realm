export const iconsList = [
  'comment',
  'briefcase',
  'heart',
  'bookmark',
  'music',
  'plane',
  'lightbulb-o',
  'star',
  'home',
  'shopping-cart'
] as const;

export const colorsList = [
  '#98E2C6',
  '#FFE600',
  '#6270F0',
  '#52D22E',
  '#008148',
  '#E0607E',
  '#EF8A17',
  '#EF2917',
] as const;

export type IconName = typeof iconsList[number];