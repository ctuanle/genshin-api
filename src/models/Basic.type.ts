export type Region =
  | 'Mondstadt'
  | 'Liyue'
  | 'Inazuma'
  | 'Sumeru'
  | 'Fontaine'
  | 'Natlan'
  | 'Snezhnaya'
  | "Khaenri'ah"
  | 'Unknown';

export type ModelType =
  | 'Tall male'
  | 'Tall female'
  | 'Medium male'
  | 'Medium female'
  | 'Short female';

export type WeaponType = 'Sword' | 'Polearm' | 'Bow' | 'Claymore' | 'Catalyst';

export type VisionType =
  | 'Pyro'
  | 'Cryo'
  | 'Hydro'
  | 'Dendro'
  | 'Anemo'
  | 'Electro'
  | 'Geo'
  | 'None';

export type RarityType = '4_star' | '5_star';

export type Version =
  | 'v1.0'
  | 'v1.1'
  | 'v1.2'
  | 'v1.3'
  | 'v1.4'
  | 'v1.5'
  | 'v1.6'
  | 'v2.0'
  | 'v2.1'
  | 'v2.2'
  | 'v2.3'
  | 'v2.4'
  | 'v2.5'
  | 'v2.6'
  | 'v2.7'
  | 'upcoming';

export type VoiceActorsType = {
  English: string;
  Chinese: string;
  Japanese: string;
  Korean: string;
};

export type BannerType = 'Character' | 'Weapon' | 'Permanent';
